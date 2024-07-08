import { execa } from 'execa';

export const setupCloud = async (provider) => {
  console.log(`Configurando servicios en la nube con ${provider}...`);

  try {
    switch (provider) {
      case 'AWS':
        await execa('aws', ['configure'], { stdio: 'inherit' });
        break;
      case 'Google Cloud':
        await execa('gcloud', ['init'], { stdio: 'inherit' });
        break;
      case 'Azure':
        await execa('az', ['login'], { stdio: 'inherit' });
        break;
      default:
        console.log('Proveedor de nube no soportado');
        break;
    }
    console.log(`Configuración de ${provider} completada.`);
  } catch (error) {
    if (provider === 'Google Cloud' && error.shortMessage.includes('gcloud')) {
      console.error(`El comando 'gcloud' no se reconoce.
Por favor, asegúrate de tener instalado Google Cloud SDK y que 'gcloud' esté en tu PATH.

Instrucciones para instalar Google Cloud SDK: https://cloud.google.com/sdk/docs/install

Detalles del error: ${error.message}`);
    } else if (provider === 'Azure' && error.shortMessage.includes('az')) {
      console.error(`El comando 'az' no se reconoce.
Por favor, asegúrate de tener instalado Azure CLI y que 'az' esté en tu PATH.

Instrucciones para instalar Azure CLI: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

Detalles del error: ${error.message}`);
    } else {
      console.error(`Error configurando ${provider}:`, error.message);
    }
  }
};
