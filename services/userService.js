const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const userService = {

    async registerUser(Usuario) {
    try {
      return await userModel.registerUser(Usuario);
    } catch (error) {
      console.error('Service Error - registerUser:', error);
      throw error;
    }
  },
  
  async loginUser(Usuario) {
    try {
      const user = await userModel.getUserByEmailAndPassword(Usuario.Correo, Usuario.Contraseña);
      if (!user) {
        return null;
      }

      // Generar un token JWT
      const token = jwt.sign({ id: user.id, Correo: user.Correo }, 'secretKey', { expiresIn: '1h' });
      return token;
    } catch (error) {
      console.error('Service Error - loginUser:', error);
      throw error;
    }
  },
 
  async getUsers() {
    try {
      return await userModel.getUsers();
    } catch (error) {
      console.error('Service Error - getUsers:', error);
      throw error;
    }
  },

 /**
 * Servicio para desactivar un usuario.
 * @param {number} IdUsuario - ID del usuario a desactivar.
 * @returns {Promise<any>} Resultado de la operación.
 */
async deactivateUser(IdUsuario) {
  try {
    return await userModel.deactivateUser(IdUsuario);
  } catch (error) {
    console.error('Service Error - deactivateUser:', error);
    throw error;
  }
}


}

module.exports = userService;