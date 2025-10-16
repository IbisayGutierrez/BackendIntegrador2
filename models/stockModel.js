//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();

class StockModel {
  /**
   * Obtiene el valor mínimo del stock desde la base de datos.
   * @returns {Promise<number>} Valor mínimo del stock.
   */
  async getMinStock() {
    try {
      const result = await db.query("SELECT MIN(StockMinimo) AS MinStock FROM StockProducto WHERE Activo = 1");
      return result[0]?.MinStock || 1; // Devuelve el valor mínimo o 1 por defecto
    } catch (error) {
      console.error('DB Error - getMinStock:', error);
      throw error;
    }
  }

  async getAllStock() {
    try {
      const result = await db.query("SELECT * FROM StockProducto WHERE Activo = 1");
      return result;
    } catch (error) {
      console.error('DB Error - getAllStock:', error);
      throw error;
    }
  }
}

module.exports = new StockModel();