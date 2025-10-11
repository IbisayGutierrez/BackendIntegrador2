
//@ts-check

const ProductService = require("../services/productService");

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Controller Error - getAllProducts:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve products" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    const product = await ProductService.getProductById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Controller Error - getProductById:", error);
    return res.status(500).json({ success: false, message: "Failed to retrieve product" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const insertProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precioUnitario, idCategoria, idSucursal, activo } = req.body;
    if (!nombre || !descripcion || precioUnitario == null || !idCategoria || !idSucursal || activo == null) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const producto = { nombre, descripcion, precioUnitario, idCategoria, idSucursal, activo };
    const result = await ProductService.insertProduct(producto);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("Controller Error - insertProduct:", error);
    return res.status(500).json({ success: false, message: "Failed to insert product" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const updateProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { nombre, descripcion, precioUnitario, idCategoria, idSucursal, activo } = req.body;
    if (isNaN(id) || !nombre || !descripcion || precioUnitario == null || !idCategoria || !idSucursal || activo == null) {
      return res.status(400).json({ success: false, message: "Missing or invalid fields" });
    }
    const producto = { nombre, descripcion, precioUnitario, idCategoria, idSucursal, activo };
    const result = await ProductService.updateProduct(id, producto);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Controller Error - updateProduct:", error);
    return res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID" });
    }
    const result = await ProductService.deleteProduct(id);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Controller Error - deleteProduct:", error);
    return res.status(500).json({ success: false, message: "Failed to delete product" });
  }
};
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const comprarProductoCliente = async (req, res) => {
  try {
    const { idProducto, idSucursal, cantidad } = req.body;
    if (!idProducto || !idSucursal || !cantidad) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const compra = { idProducto, idSucursal, cantidad };
    const result = await ProductService.comprarProductoCliente(compra);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Controller Error - comprarProductoCliente:", error);
    return res.status(500).json({ success: false, message: "Failed to process purchase" });
  }
};
module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
  comprarProductoCliente,
};



