const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

/**
 * @swagger
 * /api/branch:
 *   get:
 *     summary: Obtener lista de sucursales
 *     description: Devuelve todas las sucursales disponibles en el sistema.
 *     tags: [Sucursales]
 *     responses:
 *       200:
 *         description: Lista de sucursales obtenida correctamente
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
 *                   example: Sucursales obtenidas correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nombre:
 *                         type: string
 *                         example: Sucursal Central
 *                       direccion:
 *                         type: string
 *                         example: Calle Principal #123
 *       500:
 *         description: Error al obtener las sucursales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al obtener las sucursales
 *                 error:
 *                   type: string
 *                   example: Detalle del error
 */
router.get('/branch', branchController.getAllBranch);

/**
 * @swagger
 * /api/branch/{id}:
 *   get:
 *     summary: Obtener sucursal por ID
 *     description: Obtiene una sucursal específica por su ID.
 *     tags: [Sucursales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sucursal
 *     responses:
 *       200:
 *         description: Sucursal encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     IdSucursal:
 *                       type: integer
 *                       example: 1
 *                     Nombre:
 *                       type: string
 *                       example: "Sucursal Centro"
 *                     Activo:
 *                       type: integer
 *                       example: 1
 *       404:
 *         description: Sucursal no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Branch not found"
 *       400:
 *         description: ID de sucursal inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid branch ID"
 */
router.get('/branch/:id', branchController.getBranchById);

module.exports = router;