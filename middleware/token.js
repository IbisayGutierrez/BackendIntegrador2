const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Obtener el token desde el encabezado Authorization
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // El token se espera en formato "Bearer <token>"

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

module.exports = authenticateToken;
