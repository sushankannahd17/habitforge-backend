// Libraries
const express = require("express");
// Controller file
const dashboardController = require("../controller/dashboard");

// Router config
const router = express.Router();

// URLS
router.post("/totalHabitsCount", dashboardController.totalHabitsCompleted);
router.post("/overallCompletionRate", dashboardController.overallCompletionRate);

module.exports = router;