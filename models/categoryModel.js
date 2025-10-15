//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();

class productModel {
  async getAllCategory() {
    try {
      return await db.query('SELECT * FROM CategoriaProducto');
    } catch (error) {
      console.error('DB Error - getAllCategory:', error);
      throw error;
    }
  }


};
module.exports = new productModel();