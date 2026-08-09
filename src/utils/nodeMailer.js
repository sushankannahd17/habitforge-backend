const nodemailer = require("nodemailer");
require("dotenv").config();

const sendOTP = async (email, otp) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        },
    });

    await transporter.sendMail({
        from: `"HabitForge" <${process.env.EMAIL}>`,
        to: "sushan.kannah@gmail.com",
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}`,
    });

};

module.exports = {sendOTP};