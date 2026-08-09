const express = require("express");

const analyticsController = require("../controller/analytics");

const router = express.Router();

router.post("/completionRate", analyticsController.completionRateMonth);
router.post("/totalCompleted", analyticsController.totalCompleted);
router.post("/topHabits", analyticsController.topHabits);
router.post("/activityHistory", analyticsController.activityHistory);
router.post("/calculateStreaks", analyticsController.calculateStreaks);
router.post("/perfectDays", analyticsController.perfectDaysMonth);

module.exports = router;