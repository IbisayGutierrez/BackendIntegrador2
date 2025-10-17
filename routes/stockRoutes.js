const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

/**
 * @swagger
 * /api/stock/minimo:
 *   get:
 *     summary: Obtener el valor mínimo del stock
 *     description: Devuelve el valor mínimo del stock activo en el sistema.
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: Valor mínimo del stock obtenido correctamente
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
 *                   example: Valor mínimo del stock obtenido correctamente.
 *                 data:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Error al obtener el valor mínimo del stock
 */
router.get('/stock/minimo', stockController.getMinStock);


/**
 * @swagger
 * /api/stock:
 *   get:
 *     summary: Obtener todo el stock
 *     description: Devuelve una lista de todos los registros de stock activos en el sistema.
 *     tags: [Stock]
 *     responses:
 *       200:
 *         description: Lista de stock obtenida correctamente
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
 *                   example: Stock obtenido correctamente.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       IdStock:
 *                         type: integer
 *                         example: 1
 *                       IdProducto:
 *                         type: integer
 *                         example: 101
 *                       IdSucursal:
 *                         type: integer
 *                         example: 5
 *                       Cantidad:
 *                         type: integer
 *                         example: 50
 *                       StockMinimo:
 *                         type: integer
 *                         example: 10
 *                       Activo:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Error al obtener el stock
 */
router.get('/stock', stockController.getAllStock);

module.exports = router;