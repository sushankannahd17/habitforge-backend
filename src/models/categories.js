const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        default: null
    },
    key: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;