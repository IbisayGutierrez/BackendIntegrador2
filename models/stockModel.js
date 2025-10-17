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
      const result = await db.query("SELECT MIN(StockMinimo) AS MinStock FROM StockProducto WHERE Activo = 1;");
      return result[0]?.MinStock || 1; // Devuelve el valor mínimo o 1 por defecto si no hay resultados
    } catch (error) {
      console.error('DB Error - getMinStock:', error);
      throw error;
    }
  }

  /**
   * Obtiene todos los registros de stock activos desde la base de datos.
   * @returns {Promise<Object[]>} Lista de registros de stock activos.
   */
  async getAllStock() {
    try {
      const result = await db.query("SELECT * FROM StockProducto WHERE Activo = 1;");
      return result; // Devuelve todos los registros activos
    } catch (error) {
      console.error('DB Error - getAllStock:', error);
      throw error;
    }
  }
}

module.exports = new StockModel();