const habitsService = require("../service/habits");
const habitLogService = require("../service/habitLog");

const createHabit = async (req, res) => {
    try {
        const habitData = await habitsService.createHabit(req.body);

        return res.status(201).json({
            status: "success",
            ...habitData
        })
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.msg || err.message || "Failed to create habit"
        })
    }
}

const readHabits = async (req, res) => {
    try {
        const habits = await habitsService.readHabits(req.query);

        return res.status(200).json({
            status: "success",
            habits
        })
    }
    catch (err) {
        if (err.message === "No habits created") {
            return res.status(404).json({
                status: "error",
                message: err.message
            })
        }

        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

const readHabit = async (req, res) => {
    try {
        const habits = await habitsService.readHabit(req.query);

        return res.status(200).json({
            status: "success",
            ...habits
        })
    }
    catch (err) {
        if (err.message === "No habits created") {
            return res.status(404).json({
                status: "error",
                message: err.message
            })
        }

        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

const editHabits = async (req, res) => {
    try {
        const result = await habitsService.editHabit(req.body);

        return res.status(200).json({
            status: "success",
            message: result
        });
    } catch (err) {
        if (err.message === "Document not found") {
            return res.status(404).json({
                status: "error",
                message: err.message
            });
        }

        return res.status(500).json({
            status: "error",
            message: err.message
        });
    }
}

const deleteHabit = async (req, res) => {
    try {
        const result = await habitsService.deleteHabit(req.body);

        return res.status(200).json({
            status: "success",
            message: result
        });
    } catch (err) {
        if (err.message == "Habit Not Found") {
            return res.status(404).json({
                status: "error",
                message: err.message
            })
        }

        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

module.exports = { createHabit, readHabits, editHabits, deleteHabit, readHabit };