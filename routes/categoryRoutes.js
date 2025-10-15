const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Obtener lista de categorías
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/category', categoryController.getAllCategory);

module.exports = router;
