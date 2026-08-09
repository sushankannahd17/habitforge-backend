const habitLogService = require("../service/habitLog");

const createLog = async (req, res) => {
    try {
        const result = await habitLogService.createLogs();

        return res.status(200).json({
            status: "success",
            result
        })
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

const getLogs = async (req, res) => {
    try {
        const result = await habitLogService.getLogs(req.query.userID);

        return res.status(200).json({
            status: "success",
            ...result
        })
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }
}

const modifyLog = async (req, res) => {
    try {
        const result = await habitLogService.modifyLog(req.body);

        return res.status(200).json({
            status: "success",
            message: result
        });
    } catch (err) {
        if (err.message == "Document not found") {
            return res.status(404).json({
                status: "success",
                message: err.message
            });
        }

        return res.status(500).json({
            status: "success",
            message: err.message
        });
    }
}

module.exports = { createLog, getLogs, modifyLog };