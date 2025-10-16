//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();

class BranchModel {
  async getAllBranch() {
    try {
      const [rows] = await db.query('SELECT * FROM Sucursal WHERE Activo = 1');
      return rows;
    } catch (error) {
      console.error('DB Error - getAllBranch:', error);
      throw error;
    }
  }
  /**
   * @param {number} id
   */
  async getBranchById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM vw_Sucursales WHERE IdSucursal = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('DB Error - getBranchById:', error);
      throw error;
    }
  }
}

module.exports = BranchModel; // exportamos la clase
