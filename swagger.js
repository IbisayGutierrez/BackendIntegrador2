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
        url: 'https://backendintegrador2-production.up.railway.app',
        description: 'Servidor de producción'
      }
    ]
  },
  apis: ['./routes/*.js'] // Aquí se leerán los comentarios JSDoc
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };