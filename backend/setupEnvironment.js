import fs from 'fs';
import path from 'path';

export const setupEnvironment = (projectPath) => {
  const envPath = path.join(projectPath, '.env');
  
  // Asegurarse de que el directorio exista
  fs.mkdirSync(projectPath, { recursive: true });

  fs.writeFileSync(envPath, '');
};
