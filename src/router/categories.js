const express = require("express");
const categoryController = require("../controller/categories");

const router = express.Router();

router.get("/get", categoryController.getCategories)

module.exports = router;