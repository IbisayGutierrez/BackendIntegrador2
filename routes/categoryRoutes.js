const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');


/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Obtener lista de categorías
 *     description: Devuelve todas las categorías disponibles en el sistema.
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida correctamente
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
 *                   example: Categorías obtenidas correctamente
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
 *                         example: Electrónica
 *       500:
 *         description: Error al obtener las categorías
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
 *                   example: Error al obtener las categorías
 *                 error:
 *                   type: string
 *                   example: Detalle del error
 */
router.get('/category', categoryController.getAllCategory);

module.exports = router;