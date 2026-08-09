// Service Module
const authService = require("../service/auth")

// Libraries
const mailer = require("../utils/nodeMailer")
const jwt = require("jsonwebtoken");

// .env config
require("dotenv").config()

const register = async (req, res) => {
    try {
        const user_id = await authService.register(req.body);

        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            ...user_id
        })
    } catch (err) {
        if (err.message === "Already user is created") {
            return res.status(403).json({
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

const login = async (req, res) => {
    try {
        const userData = await authService.login(req.body);

        const jwtToken = jwt.sign(
            {id: userData.userID},
            process.env.JWT_SECRET,
            {expiresIn: "3h"}
        );

        res.cookie("jwtToken", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 3 * 1000
        })

        return res.status(200).json({
            status: "success",
            ...userData
        })
    } catch (err) {
        if (err.message === "No user found") {
            return res.status(404).json({
                status: "error",
                message: err.message
            })
        } else if (err.message === "Incorrect password!") {
            return res.status(403).json({
                status: "error",
                message: err.message
            })
        } else {
            return res.status(403).json({
                status: "error",
                message: err.message
            })
        }
    }
}

const logOut = async (req, res) => {
    res.clearCookie("jwtToken");
    return res.status(200).json({
        status: "success",
        message: "Logout successfully done"
    })
}

const fetchSidebarDetails = async (req, res) => {
    try {
        const resultData = await authService.fetchSidebarDetails(req.body.userID);

        return res.json({
            status: "success",
            ...resultData
        })
    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: e.message
        })
    }
}

const generateOTP = async (req, res) => {
    try {
        const email = req.body.email.toLowerCase();

        const checkData = await authService.checkUser(email);

        if (checkData === "Found") {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const fPasswordID = await authService.storeOTP({email,  otp})

            await mailer.sendOTP(email, otp);

            return res.status(200).json({
                status: "success",
                _id: fPasswordID,
                message: "OTP sent successfully"
            });
        }
    } catch (err) {
        if (err.message === "No user found") {
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
};

const confirmOTP = async (req, res) => {
    try {
        const message = await authService.confirmOTP(req.body);

        return res.status(202).json({
            status: "success",
            message
        })
    } catch (err) {
        if (err.message === "Invalid OTP") {
            return res.status(403).json({
                status: "error",
                message: err.message
            })
        }

        if (err.message === "User not found") {
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

const getAccountDetails = async (req, res) => {
    try {
        const resultData = await authService.getAccountDetails(req.body.userID);

        return res.json({
            status: "success",
            ...resultData
        })
    } catch (err)  {
        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

const modifyAccountDetails = async (req, res) => {
    try {
        const result = await authService.modifyAccountDetails(req.body, req.file);

        return res.json({
            status: "success",
            message: result
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};

module.exports = { register, login, logOut, fetchSidebarDetails, generateOTP, confirmOTP, getAccountDetails, modifyAccountDetails };