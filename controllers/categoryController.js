
//@ts-check

const CategoryService = require("../services/categoryService");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const getAllCategory = async (req, res) => {
  try {
    const category = await CategoryService.getAllCategory();
    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    console.error("Controller Error - getAllCategory:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve category" });
  }
};

module.exports = {
  getAllCategory,
};



