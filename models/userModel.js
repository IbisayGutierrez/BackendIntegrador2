//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();
const jwt = require('jsonwebtoken');

/**
 * @typedef {Object} Usuario
 * @property {string} Nombre - Nombre del usuario.
 * @property {string} Correo - Correo electrónico del usuario.
 * @property {string} Contraseña - Contraseña del usuario.
 */
class UserRegisterModel {


  /**
   * Registra un nuevo usuario en la base de datos.
   * @param {Usuario} Usuario - Objeto que contiene los datos del usuario.
   * @returns {Promise<any>} Resultado de la operación en la base de datos.
   */ 
 async registerUser(Usuario) {
    const { Nombre, Correo, Contraseña } = Usuario;
    try {
      return await db.query("CALL pa_InsertUsuario(?, ?, ?, NULL)", [
        Nombre,
        Correo,
        Contraseña,
        null // No se envía Rol, el procedimiento almacenado asignará 'admin' automáticamente
      ]);
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw error;
    }
  }
  /**
   * Obtiene un usuario por su correo y contraseña.
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



}

module.exports = new UserRegisterModel();