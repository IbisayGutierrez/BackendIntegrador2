//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();
class StockModel {
  /**
   * 
   * @returns {Promise<number>} 
   */
  async getMinStock() {
    try {
      const result = await db.query("SELECT MIN(StockMinimo) AS MinStock FROM StockProducto WHERE Activo = 1;");
      return result[0]?.MinStock || 1; 
    } catch (error) {
      console.error('DB Error - getMinStock:', error);
      throw error;
    }
  }

  /**
   * 
   * @returns {Promise<Object[]>} 
   */
  async getAllStock() {
    try {
      const result = await db.query("SELECT * FROM StockProducto WHERE Activo = 1;");
      return result; 
    } catch (error) {
      console.error('DB Error - getAllStock:', error);
      throw error;
    }
  }
}

module.exports = new StockModel();