const analyticsService = require("../service/analytics");

const completionRateMonth = async (req, res) => {
    const count = await analyticsService.completionRateMonth(req.body);

    return res.status(200).json({
        status: "success",
        message: count
    });
}

const totalCompleted = async (req, res) => {
    const totalCompleted = await analyticsService.totalCompleted(req.body.userID);

    return res.status(200).json({
        status: "success",
        totalCount: totalCompleted
    });
}

const topHabits = async (req, res) => {
    const percents = await analyticsService.topHabits(req.body);

    return res.status(200).json({
        status: "success",
        data: percents
    })
}

const activityHistory = async (req, res) => {
    const activityData = await analyticsService.activityHistory(req.body);

    return res.status(200).json({
        message: "success",
        data: activityData
    });
}

const calculateStreaks = async (req, res) => {
    try {
        const result = await analyticsService.calculateStreaks(req.body.userID);

        return res.json({
            status: "success",
            result
        });
    } catch (e) {
        return res.status(500).json({
            status: "error",
            message: e.message
        })
    }
}

const perfectDaysMonth = async (req, res) => {
    try {
        const resultCount = await analyticsService.perfectDaysMonth(req.body);

        return res.status(202).json({
            status: "success",
            resultCount
        })
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message
        });
    }

}

module.exports = { completionRateMonth, totalCompleted, topHabits, activityHistory, calculateStreaks, perfectDaysMonth };