//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();
const jwt = require('jsonwebtoken');

/**
 * @typedef {Object} Usuario
 * @property {string} Nombre 
 * @property {string} Correo 
 * @property {string} Contraseña 
 */
class UserRegisterModel {


  /**
   * 
   * @param {Usuario} Usuario 
   * @returns {Promise<any>} 
   */ 
 async registerUser(Usuario) {
    const { Nombre, Correo, Contraseña } = Usuario;
    try {
      return await db.query("CALL pa_InsertUsuario(?, ?, ?, NULL)", [
        Nombre,
        Correo,
        Contraseña,
        null 
      ]);
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw error;
    }
  }
  /**
   * 
   * @param {string} Correo
   * @param {string} Contraseña
   * @returns {Promise<Object|null>} 
   */
  async getUserByEmailAndPassword(Correo, Contraseña) {
    try {
      const result = await db.query("CALL pa_getUsuarioPorCorreoYContrasena(?, ?)", [Correo, Contraseña]);
      return result[0] || null;
    } catch (error) {
      console.error('DB Error - getUserByEmailAndPassword:', error);
      throw error;
    }
  }


  async getUsers() {
    try {
      const result = await db.query("SELECT * FROM vw_Usuarios");
      return result;
    } catch (error) {
      console.error('DB Error - getUsers:', error);
      throw error;
    }
  }


}

module.exports = new UserRegisterModel();