const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(console.log("MongoDB Connected Successfully"));
}

module.exports = dbConnect;