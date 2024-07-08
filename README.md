
# LOBSTER DEV ENV
# Lobster Dev Env

CLI para configurar rápidamente un entorno de desarrollo backend con Node.js, con soporte para múltiples frameworks, bases de datos y proveedores de servicios en la nube.

## Instalación

Para instalar globalmente usando npm:

```sh
npm install -g lobster-dev-env


Uso
Crear un nuevo proyecto backend
Para crear un nuevo proyecto backend, usa el comando create seguido del nombre del proyecto. Por ejemplo:

    lob create mi-proyecto

    Opciones disponibles
Al crear un nuevo proyecto, se te pedirá que selecciones las siguientes opciones:

Framework: Puedes elegir entre Express o Nest.
Base de datos: Puedes elegir entre MongoDB, MySQL, PostgreSQL, SQL Server.
Lenguaje de desarrollo: Puedes elegir entre JavaScript y TypeScript.
Configurar variables de entorno: Puedes elegir Sí o No.
Configurar Swagger para la documentación de las APIs: Puedes elegir Sí o No.
Configurar servicios en la nube: Puedes elegir Sí o No.
Proveedor de servicios en la nube: Puedes elegir entre AWS, Google Cloud, Azure.

Scripts disponibles
Una vez creado el proyecto, puedes usar los siguientes comandos:

Iniciar el servidor en modo desarrollo:

sh
Copiar código
npm run start:dev
Construir el proyecto:

sh
Copiar código
npm run build
Iniciar el servidor en modo producción:

sh
Copiar código
npm run start:prod

Requisitos adicionales
Para utilizar la configuración de servicios en la nube, necesitarás tener instalados los SDK de los proveedores de servicios en la nube correspondientes y asegurarte de que sus CLI estén en tu PATH:

AWS CLI: Instrucciones de instalación
Google Cloud SDK: Instrucciones de instalación
Azure CLI: Instrucciones de instalación
Contribución
Si deseas contribuir a este proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature-nueva-caracteristica).
Realiza tus cambios y haz commit (git commit -am 'Agrega nueva característica').
Envía tus cambios a la rama (git push origin feature-nueva-caracteristica).
Crea un nuevo Pull Request.
Autor
Lobsang Mercedes

GitHub: lobsangmercsDR
Licencia
Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

