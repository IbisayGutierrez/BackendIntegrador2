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

};
module.exports = new BranchModel();