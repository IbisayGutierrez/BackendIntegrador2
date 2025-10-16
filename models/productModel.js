//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();

class productModel {
  /**
   * @param {{ idProducto: number, idSucursal: number, cantidad: number }} compra
   */
  async comprarProductoCliente(compra) {
    try {
      const { idProducto, idSucursal, cantidad } = compra;
      const result = await db.query(
        'CALL pa_ComprarProductoCliente(?, ?, ?)',
        [idProducto, idSucursal, cantidad]
      );
      return result;
    } catch (error) {
      console.error('DB Error - comprarProductoCliente:', error);
      throw error;
    }
  }

  async getAllProducts() {
    try {
      return await db.query('SELECT * FROM Productos WHERE Activo = 1');
    } catch (error) {
      console.error('DB Error - getAllProducts:', error);
      throw error;
    }
  }

  /**
   * @param {number} id
   */
  async getProductById(id) {
    try {
      const result = await db.query('SELECT * FROM vw_ProductosDetalle WHERE IdProducto = ?', [id]);
      return result[0] || null;
    } catch (error) {
      console.error('DB Error - getProductById:', error);
      throw error;
    }
  }
  /**
   * @param {{ nombre: string, descripcion: string, URLImagen: string, precioUnitario: number, idCategoria: number, idSucursal: number, activo: number }} producto
   */
  async insertProduct(producto) {
    try {
      const { nombre, descripcion, URLImagen, precioUnitario, idCategoria, idSucursal, activo } = producto;
      const result = await db.query(
        'CALL pa_InsertProducto(?, ?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, URLImagen, precioUnitario, idCategoria, idSucursal, activo]
      );
      return result;
    } catch (error) {
      console.error('DB Error - insertProduct:', error);
      throw error;
    }
  }
  /**
   * @param {number} id
   * @param {{ nombre: string, descripcion: string, URLImagen: string, precioUnitario: number, idCategoria: number, idSucursal: number, activo: number }} producto
   */
  async updateProduct(id, producto) {
    try {
      const { nombre, descripcion, URLImagen, precioUnitario, idCategoria, idSucursal, activo } = producto;
      const result = await db.query(
        'CALL pa_UpdateProducto(?, ?, ?, ?, ?, ?, ?, ?)',
        [id, nombre, descripcion, URLImagen, precioUnitario, idCategoria, idSucursal, activo]
      );
      return result;
    } catch (error) {
      console.error('DB Error - updateProduct:', error);
      throw error;
    }
  }
  /**
   * @param {number} id
   */
  async deleteProduct(id) {
    try {
      const result = await db.query('CALL pa_DeleteProducto(?)', [id]);
      return result;
    } catch (error) {
      console.error('DB Error - deleteProduct:', error);
      throw error;
    }
  }

};
module.exports = new productModel();