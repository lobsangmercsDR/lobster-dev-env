import { execa } from 'execa';
import path from 'path';

export const installBackendDependencies = async (framework, database, language, projectName, setupEnv, setupSwagger) => {
  const dependencies = [];
  const devDependencies = [];

  if (framework === 'Express') {
    dependencies.push('express');
    devDependencies.push('@types/express');
  } else if (framework === 'Nest') {
    dependencies.push('@nestjs/core', '@nestjs/common', '@nestjs/platform-express');
    devDependencies.push('@nestjs/cli');
  } else {
    console.log('Framework no soportado.');
    return;
  }

  if (database === 'MongoDB') {
    dependencies.push('mongoose');
    devDependencies.push('@types/mongoose');
  } else if (database === 'MySQL') {
    dependencies.push('mysql2');
    devDependencies.push('@types/mysql');
  } else if (database === 'PostgreSQL') {
    dependencies.push('pg');
    devDependencies.push('@types/pg');
  } else if (database === 'SQL Server') {
    dependencies.push('mssql');
    devDependencies.push('@types/mssql');
  }

  if (language === 'TypeScript') {
    devDependencies.push('typescript', '@types/node', 'ts-node', 'ts-node-dev');
  }

  if (setupEnv) {
    dependencies.push('dotenv');
  }

  if (setupSwagger) {
    dependencies.push('swagger-jsdoc', 'swagger-ui-express');
    devDependencies.push('@types/swagger-jsdoc', '@types/swagger-ui-express');
  }

  console.log(`Instalando dependencias para ${framework} con ${database}...`);
  await execa('npm', ['install', ...dependencies], { stdio: 'inherit', cwd: path.join(process.cwd(), projectName, 'backend') });
  if (devDependencies.length > 0) {
    console.log('Instalando dependencias de desarrollo...');
    await execa('npm', ['install', '--save-dev', ...devDependencies], { stdio: 'inherit', cwd: path.join(process.cwd(), projectName, 'backend') });
  }
};
