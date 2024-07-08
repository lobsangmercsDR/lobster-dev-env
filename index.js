#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { questions } from './backend/questions.js';
import { createBackendProjectStructure } from './backend/createBackendProjectStructure.js';
import { installBackendDependencies } from './backend/installBackendDependencies.js';
import { setupEnvironment } from './backend/setupEnvironment.js';
import { setupSwagger } from './backend/setupSwagger.js';
import { setupCloud } from './backend/setupCloud.js';
import fs from 'fs';
import path from 'path';

const program = new Command();

program
  .version('1.0.0')
  .description('CLI para configurar rápidamente un entorno de desarrollo backend y servicios en la nube');

const createBackendProject = async (projectName, projectPath, answers) => {
  const { framework, database, language, setupEnv, setupSwagger: swagger, cloudSetup, cloudProvider } = answers;
  console.log(`Creando proyecto backend ${projectName}...`);
  const indexPath = createBackendProjectStructure(projectPath, framework, language);
  await installBackendDependencies(framework, database, language, projectName, setupEnv, swagger);

  if (setupEnv) {
    setupEnvironment(projectPath);
  }

  if (swagger) {
    const swaggerSetup = setupSwagger(language);
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const updatedContent = indexContent.replace("app.listen(port", swaggerSetup + "\n\napp.listen(port");
    fs.writeFileSync(indexPath, updatedContent, 'utf8');
  }

  if (cloudSetup) {
    await setupCloud(cloudProvider);
  }

  console.log('Proyecto backend creado exitosamente.');
};

program
  .command('create <project-name>')
  .description('Crea un nuevo proyecto backend')
  .action(async (projectName) => {
    const backendAnswers = await inquirer.prompt(questions);
    const projectPath = path.join(process.cwd(), projectName);
    await createBackendProject(projectName, path.join(projectPath, 'backend'), backendAnswers);
    console.log('Proyecto creado exitosamente.');
  });

program.parse(process.argv);
