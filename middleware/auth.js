const jwt = require('jsonwebtoken');

/**
 * Genera un token JWT para un usuario.
 * @param {Object} user - Información del usuario (por ejemplo, id y correo).
 * @returns {string} Token JWT generado.
 */
const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Middleware para verificar el token JWT.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Obtener el token del encabezado Authorization

  if (!token) {
    return res.status(401).json({ success: false, message: "Usuario no autenticado. Por favor, inicie sesión." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Agregar la información del usuario al objeto req
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Token inválido o expirado" });
  }
};

module.exports = {
  generateToken,
  authenticateToken,
};