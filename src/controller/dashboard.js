// Services
const dashboardService = require("../service/dashboard");

const totalHabitsCompleted = async (req, res) => {
    try {
        const count = await dashboardService.totalHabitsCompleted(req.body.userID);

        return res.status(202).json({
            status: "success",
            count
        })
    } catch (err) {
        return res.status(500).json({
            status: "error",
            error: err.message
        });
    }
}

const overallCompletionRate = async (req, res) => {
    try {
        const result = await dashboardService.overallCompletionRate(req.body.userID);

        return res.status(202).json({
            status: "success",
            result
        })
    } catch (err) {
        return res.status(500).json({
            status: "error",
            error: err.message
        });
    }
}

module.exports = { totalHabitsCompleted, overallCompletionRate };