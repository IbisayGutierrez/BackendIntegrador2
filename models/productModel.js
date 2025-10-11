//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();

class productModel {
    
  async getAllProducts() {
    try {
      return await db.query('SELECT * FROM Productos WHERE Activo = 1');
    } catch (error) {
      console.error('DB Error - getAllProducts:', error);
      throw error;
    }
  }


};
module.exports = new productModel();