const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

/**
 * @swagger
 * /api/branch:
 *   get:
 *     summary: Obtener lista de sucursales
 *     responses:
 *       200:
 *         description: Lista de sucursales
 */
router.get('/branch', branchController.getAllBranch);

module.exports = router;
