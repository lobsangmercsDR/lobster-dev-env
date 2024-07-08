import fs from 'fs';
import path from 'path';
import { createBackendServerContent } from './createBackendServerContent.js';

export const createBackendProjectStructure = (projectPath, framework, language) => {
  const directories = [
    'src',
    'src/controllers',
    'src/models',
    'src/routes',
    'src/middlewares',
    'src/config',
    'src/utils',
    'src/tests',
    'public',
  ];

  directories.forEach(dir => fs.mkdirSync(path.join(projectPath, dir), { recursive: true }));

  const ext = language === 'TypeScript' ? 'ts' : 'js';
  const indexPath = path.join(projectPath, 'src', `main.${ext}`);

  const serverContent = createBackendServerContent(framework, language);
  fs.writeFileSync(indexPath, serverContent);

  if (framework === 'Nest') {
    const appModulePath = path.join(projectPath, 'src', `app.module.${ext}`);
    const appControllerPath = path.join(projectPath, 'src', `app.controller.${ext}`);
    const appServicePath = path.join(projectPath, 'src', `app.service.${ext}`);
    const mainPath = path.join(projectPath, 'src', `main.${ext}`);

    const appModuleContent = `
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
    `.trim();

    const appControllerContent = `
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
    `.trim();

    const appServiceContent = `
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
    `.trim();

    const mainContent = `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
    `.trim();

    fs.writeFileSync(appModulePath, appModuleContent);
    fs.writeFileSync(appControllerPath, appControllerContent);
    fs.writeFileSync(appServicePath, appServiceContent);
    fs.writeFileSync(mainPath, mainContent);
  }

  const packageJsonPath = path.join(projectPath, 'package.json');
  let packageJsonContent = {};

  if (fs.existsSync(packageJsonPath)) {
    packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  }

  packageJsonContent.scripts = packageJsonContent.scripts || {};

  if (framework === 'Nest') {
    packageJsonContent.scripts = {
      ...packageJsonContent.scripts,
      "start": "nest start",
      "build": "nest build",
      "start:dev": "nest start --watch",
      "start:prod": "npm run build && node dist/main",
      "prestart:prod": "npm run build",
      "test": "jest",
      "test:watch": "jest --watch",
      "test:cov": "jest --coverage",
      "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register",
      "lint": "eslint '{src,apps,libs,test}/**/*.ts' --fix"
    };
  } else if (framework === 'Express') {
    packageJsonContent.scripts = {
      ...packageJsonContent.scripts,
      "start": `ts-node ${path.join('src', `index.${ext}`)}`,
      "dev": `ts-node-dev --respawn --transpile-only ${path.join('src', `index.${ext}`)}`,
      "build": "tsc"
    };
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent, null, 2));

  if (language === 'TypeScript') {
    fs.writeFileSync(
      path.join(projectPath, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          target: "es5",
          module: "commonjs",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          outDir: "./dist",
          rootDir: "./src"
        },
        include: ["src/**/*"],
        exclude: ["node_modules", "dist"]
      }, null, 2)
    );
  }

  return indexPath;
};
