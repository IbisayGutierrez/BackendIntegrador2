const ProductModel = require("../models/categoryModel");

class CategoryService {
  async getAllCategory() {
    return await ProductModel.getAllCategory();
  }
}
module.exports = new CategoryService();