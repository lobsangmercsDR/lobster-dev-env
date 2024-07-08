export const setupSwagger = (language) => {
    return language === 'TypeScript' ?
    `import swaggerUi from 'swagger-ui-express';
  import swaggerJsdoc from 'swagger-jsdoc';
  
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.ts'],
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));` :
    `const swaggerUi = require('swagger-ui-express');
  const swaggerJsdoc = require('swagger-jsdoc');
  
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.js'],
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));`;
  };
  