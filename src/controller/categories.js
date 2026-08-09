const categoryModel = require("../models/categories");

const getCategories = async (req, res) => {
    const resultData = await categoryModel.find({});

    return res.status(200).json({
        status: "success",
        categories: resultData
    });
}

module.exports = {getCategories};