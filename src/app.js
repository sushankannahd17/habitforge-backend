// Libraries
const express = require("express");

// Router files
const habitRouter = require("./router/habits")
const authRouter = require("./router/auth");
const categoryRouter = require("./router/categories");
const habitLogRouter = require("./router/habitLog");
const analyticsRouter = require("./router/analytics");
const dashboardRouter = require("./router/dashboard");

// Router config
const router = express.Router();

router.use("/auth", authRouter);
router.use("/habits", habitRouter);
router.use("/categories", categoryRouter);
router.use("/habitlog", habitLogRouter);
router.use("/analytics", analyticsRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router