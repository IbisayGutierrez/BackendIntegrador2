//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();

class BranchModel {

  async getAllBranch() {
    try {
      return await db.query('SELECT * FROM Sucursal WHERE Activo = 1');
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
      const result = await db.query('SELECT * FROM vw_Sucursales WHERE IdSucursal = ?', [id]);
      return result[0] || null;
    } catch (error) {
      console.error('DB Error - getBranchById:', error);
      throw error;
    }
  }

};
module.exports = new BranchModel();