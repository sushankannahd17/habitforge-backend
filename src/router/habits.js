const habitController = require("../controller/habits");
const habitMiddleware = require("../middleware/habits");

const express = require("express");

const router = express.Router();

router.post("/create", habitMiddleware.habitValidate, habitController.createHabit);
router.get("/read", habitController.readHabits);
router.get("/readOne", habitController.readHabit);
router.patch("/edit", habitController.editHabits);
router.delete("/delete", habitController.deleteHabit);

module.exports = router;