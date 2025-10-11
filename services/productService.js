const ProductModel = require("../models/productModel");

class ProductService {
  async getAllProducts() {
    return await ProductModel.getAllProducts();
  }


}
module.exports = new ProductService();