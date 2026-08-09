// Libraries
const mongoose = require("mongoose");
const dayjs = require("dayjs")
const utc = require("dayjs/plugin/utc")
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
// Models
const habitLogModel = require("../models/habitLog");
const habitModel = require("../models/habits");
// Methods
const streakCalc = require("../utils/streakCalc")
const normalizeMonth = require("../utils/monthNormalizer");
// Configs
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);

const completionRateMonth = async (data) => {
    const { userID, month, year } = data;

    const startDate = dayjs
        .utc(`${year}-${month}-01`)
        .startOf("month");

    const endDate = startDate.add(1, "month");

    const userObjectId = new mongoose.Types.ObjectId(userID);

    const completedCount = await habitLogModel.countDocuments({
        userID: userObjectId,
        done: true,
        createdAt: {
            $gte: startDate.toDate(),
            $lt: endDate.toDate()
        }
    });

    const totalCount = await habitLogModel.countDocuments({
        userID: userObjectId,
        createdAt: {
            $gte: startDate.toDate(),
            $lt: endDate.toDate()
        }
    });

    if (totalCount === 0) return 0;

    return (completedCount / totalCount) * 100;
};

const totalCompleted = async (userID) => {
    const totalCompleted = await habitLogModel.countDocuments({
        userID: new mongoose.Types.ObjectId(userID),
        done: true
    });

    return totalCompleted;
}

const topHabits = async (data) => {
    const { userID, month, year } = data;

    const startDate = dayjs
        .utc(`${year}-${month}-01`)
        .startOf("month");

    const endDate = startDate.add(1, "month");


    const habitsList = await habitModel.find({
        userID: new mongoose.Types.ObjectId(userID),
        isEnabled: true
    })

    let habitPercent = [];

    for (let i = 0; i < habitsList.length; i++) {
        const totalCount = await habitLogModel.countDocuments({
            userID: new mongoose.Types.ObjectId(userID),
            habitName: habitsList[i].name,
            createdAt: {
                $gte: startDate.toDate(),
                $lt: endDate.toDate()
            }
        });

        const doneCount = await habitLogModel.countDocuments({
            userID: new mongoose.Types.ObjectId(userID),
            habitName: habitsList[i].name,
            done: true,
            createdAt: {
                $gte: startDate.toDate(),
                $lt: endDate.toDate()
            }
        });

        if (totalCount == 0) continue;

        habitPercent.push({
            habitName: habitsList[i].name,
            percent: (doneCount / totalCount) * 100,
            color: habitsList[i].appearance.backgroundKey,
            categoryIcon: habitsList[i].categoryIcon
        });

        habitPercent.sort((a, b) => b.percent - a.percent);
    }

    return ((habitPercent.length > 4) ? habitPercent.slice(0, 4) : habitPercent);
}

const activityHistory = async (data) => {
    const { userID, month, year } = data;

    const startDate = dayjs
        .utc(`${year}-${month}-01`)
        .startOf("month");

    const endDate = startDate.add(1, "month");

    const resultData = await habitLogModel.aggregate([
        {
            $match: {
                userID: new mongoose.Types.ObjectId(userID),
                done: true,
                createdAt: {
                    $gte: startDate.toDate(),
                    $lt: endDate.toDate()
                }
            }
        },
        {
            $group: {
                _id: {
                    $toString: { $dayOfMonth: "$createdAt" }
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    return resultData;
}

const calculateStreaks = async (userID) => {
    const totalHabits = await habitModel.countDocuments({
        userID: new mongoose.Types.ObjectId(userID)
    });

    const logs = await habitLogModel.find({
        userID: new mongoose.Types.ObjectId(userID),
        done: true
    }).select("habitID createdAt");

    const dayMap = {};

    for (const log of logs) {
        const day = dayjs.utc(log.createdAt).format("YYYY-MM-DD");

        if (!dayMap[day]) {
            dayMap[day] = new Set();
        }

        dayMap[day].add(String(log.habitID));
    }

    return streakCalc(dayMap, totalHabits);
}

const perfectDaysMonth = async (data) => {
    let { userID, year, month } = data;

    month = normalizeMonth(month);

    if (!month || month < 1 || month > 12) {
        throw new Error("Invalid month value");
    }

    const userObjectId = new mongoose.Types.ObjectId(userID);

    const start = dayjs
        .utc(`${year}-${month}-01`)
        .startOf("month");

    const end = start.endOf("month");

    const completedPerDay = await habitLogModel.aggregate([
        {
            $match: {
                userID: userObjectId,
                done: true,
                createdAt: {
                    $gte: start.toDate(),
                    $lte: end.toDate()
                }
            }
        },
        {
            $group: {
                _id: {
                    day: {
                        $dateTrunc: {
                            date: "$createdAt",
                            unit: "day",
                            timezone: "UTC"
                        }
                    },
                    habitID: "$habitID"
                }
            }
        },
        {
            $group: {
                _id: "$_id.day",
                completedCount: { $sum: 1 }
            }
        }
    ]);

    const habits = await habitModel.find({
        userID: userObjectId,
        isEnabled: true
    });

    let perfectDays = 0;

    for (const day of completedPerDay) {
        const dayEnd = dayjs.utc(day._id).endOf("day");

        const expectedHabits = habits.filter(h =>
            dayEnd.isSameOrAfter(dayjs.utc(h.schedule.startDate))
        );

        if (
            expectedHabits.length > 0 &&
            day.completedCount === expectedHabits.length
        ) {
            perfectDays++;
        }
    }

    return perfectDays;
};

module.exports = {completionRateMonth, totalCompleted, topHabits, activityHistory, calculateStreaks, perfectDaysMonth};