const habitModel = require("../models/habits");
const mongoose = require("mongoose");
const {contextsKey} = require("express-validator/lib/base");

const createHabit = async (data) => {
    const {
        userID,
        name,
        description,
        categoryIcon,
        categoryName,
        schedule: {frequency, repeatOn, timeOfDay, startDate},
        appearance: {backgroundKey},
        isEnabled
    } = data;

    const newData = await habitModel({
        userID,
        name,
        description,
        categoryIcon,
        categoryName,
        schedule: {
            frequency, repeatOn, timeOfDay, startDate
        },
        appearance: {
            backgroundKey
        },
        isEnabled
    });

    const habitID = await newData.save();

    return {habitID: habitID._id, ...data};
}

const readHabits = async (data) => {
    const {userID} = data;

    const userData = await habitModel.find({userID: new mongoose.Types.ObjectId(userID)});
    if (userData.length === 0) {
        throw new Error("No habits created");
    }

    return userData;
}

const readHabit = async (data) => {
    const { habitID } = data;

    const result = await habitModel.findOne({_id: new mongoose.Types.ObjectId(habitID)});

    return result._doc;
}

const editHabit = async (data) => {
    const {
        habitID,
        userID,
        name,
        description,
        categoryIcon,
        categoryName,
        schedule: {frequency, repeatOn, timeOfDay, startDate},
        appearance: {backgroundKey},
        isEnabled
    } = data;

    const result = await habitModel.updateOne({
        _id: new mongoose.Types.ObjectId(habitID)
    }, {
        name,
        description,
        categoryIcon,
        categoryName,
        schedule: {frequency, repeatOn, timeOfDay, startDate},
        appearance: {backgroundKey},
        isEnabled
    })

    if (result.modifiedCount == 1) return "Habit updated"
    else throw new Error("Habit not found");
}

const deleteHabit = async (data) => {
    const { habitID } = data;

    const result = await habitModel.deleteOne({_id: new mongoose.Types.ObjectId(habitID)});

    if (result.deletedCount != 1) throw new Error("Habit Not Found");
    return "Habit Deleted";
}

module.exports = { createHabit, readHabits, editHabit, deleteHabit, readHabit };