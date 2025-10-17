const ProductModel = require("../models/productModel");

class ProductService {
  async comprarProductoCliente(compra) {
    return await ProductModel.comprarProductoCliente(compra);
  }
  async getAllProducts() {
    return await ProductModel.getAllProducts();
  }

  async getProductById(id) {
    return await ProductModel.getProductById(id);
  }

  async insertProduct(producto) {
    return await ProductModel.insertProduct(producto);
  }

  async updateProduct(id, producto) {
    return await ProductModel.updateProduct(id, producto);
  }

  async deleteProduct(id) {
    return await ProductModel.deleteProduct(id);
  }

  async getProductByCategory(id) {
    return await ProductModel.getProductByCategory(id);
  }
}
module.exports = new ProductService();