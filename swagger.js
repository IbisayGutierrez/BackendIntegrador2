import swaggerautogen from "swagger-autogen";

const outputFile = "./swagger.json";
const endpointsFiles = ["./index.js"];

const doc = {
    info: {
        title: "API Documentation",
        description: "API documentation for the backendintegrador2 project",
        version: "1.0.0"
    },
    host: 'localhost:3000',
    schemas: ['http']


};
swaggerautogen()(outputFile, endpointsFiles, doc);