
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const isProduction = process.env.NODE_ENV === 'production';

const servers = isProduction
  ? [
      {
        url: 'https://backendintegrador2-production.up.railway.app',
        description: 'Servidor de producción'
      }
    ]
  : [
      {
        url: 'http://localhost:8080',
        description: 'Desarrollo (local)'
      }
    ];

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentación generada automáticamente para la API'
    },
    servers
  },
  apis: ['./routes/*.js'] // Ajusta según tu estructura
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
