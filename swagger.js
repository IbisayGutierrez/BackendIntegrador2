const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación generada automáticamente para la API'
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local'
      }
    ]
  },
  apis: ['./routes/*.js'] // Aquí se leerán los comentarios JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };