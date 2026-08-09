const { body, validationResult } = require("express-validator");

const validator = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = errors.array();

        return res.status(400).json({
            status: "error",
            message: error[0].msg
        })
    }

    next();
};

const habitValidate = [
    body("name")
        .notEmpty().withMessage("Enter the habit name"),
    body("categoryIcon")
        .notEmpty().withMessage("Select the category"),
    body("schedule.frequency")
        .notEmpty().withMessage("Select the frequency"),
    body("schedule.repeatOn")
        .notEmpty().withMessage("Select which days to be repeated"),
    body("schedule.startDate")
        .notEmpty().withMessage("Select the date to be started"),
    body("appearance.backgroundKey")
        .notEmpty().withMessage("Select the background"),
    validator
];

module.exports = { habitValidate };