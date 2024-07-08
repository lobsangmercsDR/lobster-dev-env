export const createBackendServerContent = (framework, language) => {
  if (framework === 'Express') {
    return language === 'TypeScript' ?
      `import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

app.listen(port, () => {
  console.log(\`Servidor escuchando en http://localhost:\${port}\`);
});` :
      `const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hola, mundo!');
});

app.listen(port, () => {
  console.log(\`Servidor escuchando en http://localhost:\${port}\`);
});`;
  }

  if (framework === 'Nest') {
    return `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('Server is running on port 3000');
}
bootstrap();
`.trim();
  }

  return '';
};
