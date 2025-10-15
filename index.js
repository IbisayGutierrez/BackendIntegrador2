const express = require('express');
const { swaggerUi, swaggerSpec } = require('./swagger');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta principal
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente' });
});

// Rutas
app.use('/api', productRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => 
console.log(`Servidor corriendo en http://localhost:${PORT}`));