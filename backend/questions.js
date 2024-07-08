export const questions = [
  {
    type: 'list',
    name: 'framework',
    message: 'Selecciona el framework para tu proyecto backend:',
    choices: [
      'Express',
      'Nest'
    ],
  },
  {
    type: 'list',
    name: 'database',
    message: 'Selecciona la base de datos para tu proyecto:',
    choices: [
      'MongoDB',
      'MySQL',
      'PostgreSQL',
      'SQL Server',
    ],
  },
  {
    type: 'list',
    name: 'language',
    message: '¿Con qué lenguaje deseas trabajar?',
    choices: [
      'JavaScript',
      'TypeScript',
    ],
  },
  {
    type: 'confirm',
    name: 'setupEnv',
    message: '¿Deseas configurar variables de entorno?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'setupSwagger',
    message: '¿Deseas configurar Swagger para la documentación de las APIs?',
    default: false,
  },
  {
    type: 'confirm',
    name: 'cloudSetup',
    message: '¿Deseas configurar servicios en la nube?',
    default: false,
  },
  {
    type: 'list',
    name: 'cloudProvider',
    message: 'Selecciona el proveedor de servicios en la nube:',
    choices: [
      'AWS',
      'Google Cloud',
      'Azure',
    ],
    when: (answers) => answers.cloudSetup,
  }
];
