const habitLogController = require("../controller/habitLog");
const express = require("express");

const router = express.Router();

router.post("/create", habitLogController.createLog);
router.get("/get", habitLogController.getLogs);
router.patch("/modifyTick", habitLogController.modifyLog);

module.exports = router;