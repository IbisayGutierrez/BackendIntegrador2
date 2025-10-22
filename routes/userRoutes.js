const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema. Los campos 'Rol' e 'IdSucursal' son opcionales; si no se envía 'Rol' el procedimiento almacenado asigna 'admin' por defecto.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Nombre:
 *                 type: string
 *                 example: Juan
 *               Correo:
 *                 type: string
 *                 example: juan@example.com
 *               Contraseña:
 *                 type: string
 *                 example: password123
 *               Rol:
 *                 type: string
 *                 enum: [admin, usuario]
 *                 description: Rol del usuario; si se omite será 'admin' por defecto.
 *                 example: usuario
 *               IdSucursal:
 *                 type: integer
 *                 nullable: true
 *                 description: Id de la sucursal asociada (opcional).
 *                 example: 1
 *             required:
 *               - Nombre
 *               - Correo
 *               - Contraseña
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario registrado correctamente.
 *                 data:
 *                   type: object
 *       400:
 *         description: Campos faltantes o inválidos
 *       500:
 *         description: Error al registrar el usuario
 */
router.post('/users/register', userController.registerUser);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión en el sistema.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Correo:
 *                 type: string
 *                 example: juan@example.com
 *               Contraseña:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso.
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post('/users/login', userController.loginUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados en el sistema.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuarios obtenidos correctamente.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       Nombre:
 *                         type: string
 *                         example: Juan
 *                       Correo:
 *                         type: string
 *                         example: juan@example.com
 *                       Rol:
 *                         type: string
 *                         example: administrador
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get('/users', userController.getUsers);


/**
 * @swagger
 * /api/users/{IdUsuario}/deactivate:
 *   delete:
 *     summary: Desactivar un usuario
 *     description: Cambia el estado de un usuario a inactivo.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: IdUsuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a desactivar.
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario desactivado correctamente.
 *       400:
 *         description: ID del usuario faltante o inválido
 *       500:
 *         description: Error al desactivar el usuario
 */
router.delete('/users/:IdUsuario/deactivate', userController.deactivateUser);


module.exports = router;
