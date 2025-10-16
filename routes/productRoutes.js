const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * @swagger
 * /api/products:
 *   get:
 *     tags: [Productos]
 *     summary: Obtener lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/products', productController.getAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags: [Productos]
 *     summary: Obtener producto por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Detalle del producto
 *       404:
 *         description: Producto no encontrado
 */
router.get('/products/:id', productController.getProductById);

/**
 * @swagger
 * /api/products:
 *   post:
 *     tags: [Productos]
 *     summary: Insertar un nuevo producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - URLImagen
 *               - precioUnitario
 *               - idCategoria
 *               - idSucursal
 *               - activo
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               URLImagen:
 *                 type: string
 *               precioUnitario:
 *                 type: number
 *               idCategoria:
 *                 type: integer
 *               idSucursal:
 *                 type: integer
 *               activo:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
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
 */
router.post('/products', productController.insertProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags: [Productos]
 *     summary: Actualizar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               URLImagen:
 *                 type: string
 *               precioUnitario:
 *                 type: number
 *               idCategoria:
 *                 type: integer
 *               idSucursal:
 *                 type: integer
 *               activo:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
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
 *       400:
 *         description: Datos inválidos
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
 *                   example: "Missing or invalid fields"
 *       404:
 *         description: Producto no encontrado
 */
router.put('/products/:id', productController.updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags: [Productos]
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete('/products/:id', productController.deleteProduct);

/**
 * @swagger
 * /api/products/comprar:
 *   post:
 *     tags: [Productos]
 *     summary: Comprar producto por cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idProducto:
 *                 type: integer
 *               idSucursal:
 *                 type: integer
 *               cantidad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Compra realizada
 */
router.post('/products/comprar', productController.comprarProductoCliente);

module.exports = router;
