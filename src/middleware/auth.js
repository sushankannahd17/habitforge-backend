const { body, validationResult } = require("express-validator");

const validator = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = errors.array();

        return res.status(400).json({
            status: "error",
            message: error[0]
        })
    }

    next();
}

const register = [
    body("name")
        .trim()
        .notEmpty().withMessage("Enter user name")
        .isLength({ min: 1 }).withMessage("Enter user name"),
    body("email")
        .trim()
        .notEmpty().withMessage("Enter email ID"),
    body("password")
        .notEmpty().withMessage("Enter password")
        .isLength({ min: 8 }).withMessage("Password should be more than 8 characters"),
    validator
];

const login = [
    body("email")
        .trim()
        .notEmpty().withMessage("Enter email ID"),
    body("password")
        .notEmpty().withMessage("Enter password")
        .isLength({ min: 8 }).withMessage("Password should be more than 8 characters"),
    validator
]

module.exports = { register, login };