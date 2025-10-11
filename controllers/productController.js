//@ts-check

const ProductService = require("../services/productService");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Controller Error - getAllProducts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
    });
  }
};
module.exports = {
  getAllProducts,
};



