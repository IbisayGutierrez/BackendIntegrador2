const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('./swagger.json');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger Docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

// Ruta principal
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API funcionando correctamente' });
});

// Rutas de productos
app.use('/api', productRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});