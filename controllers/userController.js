const userService = require('../services/userService');



 const registerUser = async (req, res) => {
  try {
    const { Nombre, Correo, Contraseña, Rol = null, IdSucursal = null } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!Nombre || !Correo || !Contraseña || !Rol || !IdSucursal) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos obligatorios (Nombre, Correo, Contraseña) deben estar presentes.',
      });
    }

    // Validar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Correo)) {
      return res.status(400).json({ success: false, message: 'Correo inválido.' });
    }

    // Validar longitud de la contraseña
    if (Contraseña.length < 6) {
      return res.status(400).json({ success: false, message: 'La contraseña debe tener al menos 6 caracteres.' });
    }

    // Asegurar IdSucursal numérico o null
    const idSucursalVal = IdSucursal !== undefined && IdSucursal !== null ? Number(IdSucursal) : null;

    const result = await userService.registerUser({ Nombre, Correo, Contraseña, Rol, IdSucursal: idSucursalVal });
    return res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente.',
      data: result,
    });
  } catch (error) {
    console.error('Controller Error - registerUser:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'El correo ya está registrado.' });
    }
    return res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
  }
};

   const loginUser = async (req, res) => {
    try {
      const { Correo, Contraseña } = req.body;

      if (!Correo || !Contraseña) {
        return res.status(400).json({
          success: false,
          message: 'Correo y contraseña son obligatorios.',
        });
      }

      const token = await userService.loginUser({ Correo, Contraseña });
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas.',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso.',
        data: { token },
      });
    } catch (error) {
      console.error('Controller Error - loginUser:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al iniciar sesión.',
      });
    }
  };

  const getUsers = async (req, res) => {
    try {
      const users = await userService.getUsers();
      return res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos correctamente.',
        data: users,
      });
    } catch (error) {
      console.error('Controller Error - getUsers:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener los usuarios.',
      });
    }
  };

/**
 * Controlador para desactivar un usuario.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const deactivateUser = async (req, res) => {
  try {
    const { IdUsuario } = req.params;

    if (!IdUsuario) {
      return res.status(400).json({
        success: false,
        message: 'El ID del usuario es obligatorio.',
      });
    }

    const result = await userService.deactivateUser(IdUsuario);
    return res.status(200).json({
      success: true,
      message: 'Usuario desactivado correctamente.',
      data: result,
    });
  } catch (error) {
    console.error('Controller Error - deactivateUser:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al desactivar el usuario.',
    });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deactivateUser
}  