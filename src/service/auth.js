// Libraries
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Models
const userModel = require("../models/user");
const otpModel = require("../models/otp")

// Utilities
const cloudinary = require("../utils/cloudinary");

// .env config
require("dotenv").config()

const register = async (data) => {
    const { name, email, password } = data;

    const existingUser = await userModel.findOne({
        email: email.toLowerCase()
    });

    if (existingUser) {
        throw new Error("Already user is created");
    }

    const passwordHashed = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const newUser = await userModel({
        name,
        email: email.toLowerCase(),
        password: passwordHashed,
        profilePic: ""
    })

    const user_id = await newUser.save();

    return { userID: user_id };
}

const login = async (data) => {
    const { email, password } = data;

    const userData = await userModel.findOne({
        email: email.toLowerCase()
    });

    if (!userData) {
        throw new Error("No user found");
    }

    const comparePswd = await bcrypt.compare(password, userData.password);

    if (!comparePswd) {
        throw new Error("Incorrect password!");
    }
    else {
        return {
            userID: userData._id,
            name: userData._doc.name,
            email: userData._doc.email,
            profilePic: userData._doc.profilePic
        };
    }
}

const fetchSidebarDetails = async (userID) => {
    const data = await userModel.findById(userID);

    if (!data) throw new Error("User not found");

    return {
        name: data.name,
        email: data.email,
        profilePic: data.profilePic
    };
}

const checkUser = async (emailID) => {
    if (!emailID) {
        throw new Error("Email is required");
    }

    const userData = await userModel.findOne({
        email: emailID.toLowerCase()
    });

    if (!userData) {
        throw new Error("No user found");
    }

    return "Found";
};

const storeOTP = async (data) => {
    const { email, otp } = data;

    const isExists = await userModel.countDocuments({ email: email.trim().toLowerCase() })

    const resultData = await otpModel.findOne({ email: email.trim().toLowerCase() });

    if (resultData) {
        await otpModel.deleteMany({email: email.trim().toLowerCase()});
    }

    const newDoc = await otpModel({
        email: email.trim().toLowerCase(),
        otp
    });

    const saved = await newDoc.save();

    return saved._id
}

const confirmOTP = async (data) => {
    const { email, otp, password } = data;

    const resultData = await otpModel.findOne({ email: email.trim().toLowerCase() });

    if (!resultData) {
        throw new Error("OTP not found or expired");
    }

    if (resultData.otp !== Number(otp)) {
        throw new Error("Invalid OTP");
    }

    const passwordHashed = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

    const updateResult = await userModel.updateOne(
        {email: email.trim().toLowerCase()},
        { $set: { password: passwordHashed } }
    );

    if (updateResult.matchedCount === 0) {
        throw new Error("User not found");
    }

    await otpModel.deleteOne({ email: email.trim().toLowerCase() })

    return "Password updated successfully"
}

const getAccountDetails = async (userID) => {
    const details = await userModel.findById(userID);

    if (!details) throw new Error("User not found");

    return {
        name: details.name,
        email: details.email,
        profilePic: details.profilePic
    };
};

const modifyAccountDetails = async (data, file) => {
    const { userID, name, email, profilePic } = data;

    const uploadPic = await cloudinary.uploader.upload(file.path);

    const result = await userModel.updateOne({
        _id: new mongoose.Types.ObjectId(userID)
    }, {
        email,
        name,
        profilePic: uploadPic.secure_url
    });

    if (result.modifiedCount != 1) throw new Error("Something went wrong");

    return "Details updated"
};

module.exports = { register, login, fetchSidebarDetails, checkUser, storeOTP, confirmOTP, getAccountDetails, modifyAccountDetails }