import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const openapiSpecification = swaggerJsdoc(
    {
        definition: {
          openapi: '3.0.0',
          info: {
            version: '1.0',
            title: 'Talkit',
          },
          servers:[ {url:`http://localhost:${5000}/api`}]
        },
        apis : ['./src/routes/*.js', './src/models/*.js', './src/models/*.ts', './src/routes/*.ts']  // files containing annotations as above
      }
);

const  swaggerServe = swaggerUi.serve;
const swaggerSetup  = swaggerUi.setup(openapiSpecification);

export {swaggerServe, swaggerSetup}