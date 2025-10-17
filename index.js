const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger');
const productRoutes = require('./routes/productRoutes');
const branchRoutes = require('./routes/branchRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS
app.use(cors());

// Ruta principal
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente' });
});

// Rutas
app.use('/api', productRoutes);
app.use('/api', branchRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => 
console.log(`Servidor corriendo en http://localhost:${PORT}`));

