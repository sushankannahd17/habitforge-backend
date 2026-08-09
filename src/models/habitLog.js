const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema({
    habitID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    habitName: {
        type: String,
        required: true,
        trim: true
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
    appearance: {
        backgroundKey: {
            type: String,
            required: true
        }
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const habitLogModel = mongoose.model("habitLog", habitLogSchema);

module.exports = habitLogModel;