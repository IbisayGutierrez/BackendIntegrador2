const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/products', productController.getAllProducts);

module.exports = router;
