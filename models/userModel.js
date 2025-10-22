//@ts-check
const DbService = require("../config/db");
const db = DbService.getDbServiceInstance();
const jwt = require('jsonwebtoken');

/**

 * @property {string} Nombre - Nombre del usuario.
 * @property {string} Correo - Correo electrónico del usuario.
 * @property {string} Contraseña - Contraseña del usuario.
 */
class UserRegisterModel {


  /**
 * @typedef {Object} Usuario
 * @property {string} Nombre - Nombre del usuario.
 * @property {string} Correo - Correo electrónico del usuario.
 * @property {string} Contraseña - Contraseña del usuario.
 * @property {string} [Rol] - (Opcional) Rol del usuario ('admin' o 'usuario').
 * @property {number} [IdSucursal] - (Opcional) Id de la sucursal asociada.
 */

/**
 * Registra un nuevo usuario en la base de datos.
 * @param {Usuario} Usuario - Objeto que contiene los datos del usuario.
 * @returns {Promise<any>} Resultado de la operación en la base de datos.
 */ 
async registerUser(Usuario) {
  const { Nombre, Correo, Contraseña, Rol = null, IdSucursal = null } = Usuario;
  try {
    // Llamamos al procedimiento con los 5 parámetros: p_Nombre, p_Correo, p_Contraseña, p_Rol, p_IdSucursal
    return await db.query("CALL pa_InsertUsuario(?, ?, ?, ?, ?)", [
      Nombre,
      Correo,
      Contraseña,
      Rol,        // si es null el SP asignará 'admin' por defecto
      IdSucursal  // puede ser null
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


  async getUsers() {
    try {
      const result = await db.query("SELECT * FROM vw_Usuarios");
      return result;
    } catch (error) {
      console.error('DB Error - getUsers:', error);
      throw error;
    }
  }
/**
 * Desactiva un usuario en la base de datos.
 * @param {number} IdUsuario - ID del usuario a desactivar.
 * @returns {Promise<any>} Resultado de la operación en la base de datos.
 */
async deactivateUser(IdUsuario) {
  try {
    const result = await db.query("UPDATE railway.Usuario SET Activo = 0 WHERE IdUsuario = ?", [IdUsuario]);
    return result;
  } catch (error) {
    console.error('DB Error - deactivateUser:', error);
    throw error;
  }
}

}

module.exports = new UserRegisterModel();