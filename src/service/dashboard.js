// Libraries
const mongoose = require("mongoose");
// Models
const habitLogModel = require("../models/habitLog");

const totalHabitsCompleted = async (userID) => {
    userID = new mongoose.Types.ObjectId(userID);

    const count = await habitLogModel.countDocuments({
        userID,
        done: true
    })

    return count;
}

const overallCompletionRate = async (userID) => {
    userID = new mongoose.Types.ObjectId(userID);

    const doneCount = await habitLogModel.countDocuments({
        userID,
        done: true
    });

    const totalCount = await habitLogModel.countDocuments({
        userID
    });

    if (totalCount == 0) return 0;

    return (doneCount / totalCount) * 100;
}

module.exports = { totalHabitsCompleted, overallCompletionRate };