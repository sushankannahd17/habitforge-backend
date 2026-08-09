const express = require("express");
const multer = require("../middleware/multer")

const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/register", authMiddleware.register, authController.register);
router.post("/login", authMiddleware.login, authController.login);
router.post("/logout", authController.logOut);
router.post("/fetchSidebarDetails", authController.fetchSidebarDetails);
router.post("/genOTP", authController.generateOTP);
router.post("/confirmOTP", authController.confirmOTP);
router.post("/getAccountDetails", authController.getAccountDetails);
router.patch("/modifyAccountDetails", multer.single("profilePic"), authController.modifyAccountDetails);

module.exports = router;