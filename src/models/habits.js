const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    userID: {
        type:mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    categoryIcon: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    schedule: {
        frequency: {
            type: String,
            enum: ["daily", "weekly", "interval"],
            required: true
        },
        repeatOn: [{
            type: String,
            enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
        }],
        timeOfDay: {
            type: String,
            enum: ["any", "morning", "afternoon", "evening", "night"],
            default: "any"
        },
        startDate: {
            type: Date,
            required: true
        }
    },
    appearance: {
        backgroundKey: {
            type: String,
            required: true
        }
    },
    isEnabled: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const habitModel = mongoose.model("habits", habitSchema);
module.exports = habitModel;