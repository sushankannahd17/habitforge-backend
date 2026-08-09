const habitLogModel = require("../models/habitLog");
const habitModel = require("../models/habits")
const mongoose = require("mongoose")

const createLogs = async () => {
    let habitLogIDs = [];

    const habitsData = await habitModel.find({});

    const currDate = new Date();

    const day = currDate.toLocaleDateString("en-US", {weekday: "short"}).toLowerCase();

    for (const data of habitsData)  {
        if (data.schedule.repeatOn.includes(day)) {
            const logData = await habitLogModel({
                habitID: data._id,
                userID: data.userID,
                habitName: data.name,
                description: data.description,
                categoryIcon: data.categoryIcon,
                categoryName: data.categoryName,
                appearance: {
                    backgroundKey: data.appearance.backgroundKey
                }
            });

            const savedData = await logData.save();

            habitLogIDs.push(savedData._id);
        }
    }

    return { habitLogIDs };
}

const getLogs = async (userID) => {
    const startTime = new Date();
    const endTime = new Date();

    startTime.setUTCHours(0, 0, 0, 0)
    endTime.setUTCHours(23, 59, 59, 999)

    const resultData = await habitLogModel.find({
        userID: new mongoose.Types.ObjectId(userID),
        createdAt: {
            $gte: startTime,
            $lt: endTime
        }
    });

    return { resultData };
}

const modifyLog = async (data) => {
    const startTime = new Date();
    const endTime = new Date();

    startTime.setUTCHours(0, 0, 0, 0)
    endTime.setUTCHours(23, 59, 59, 999)

    const { habitID, userID, val } = data;

    const result = await habitLogModel.updateOne({
        userID: new mongoose.Types.ObjectId(userID),
        habitID: new mongoose.Types.ObjectId(habitID),
        updatedAt: {
            $gte: startTime,
            $lt: endTime
        }
    }, {
        done: val
    });

    if (result.modifiedCount == 1) return "Document updated"
    else throw new Error("Document not found");
}

module.exports = { createLogs, getLogs, modifyLog };