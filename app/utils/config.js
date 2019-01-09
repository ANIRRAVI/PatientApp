const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment',
    format: [ 'production', 'development', 'test' ],
    'default': 'development',
    arg: 'env',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The application port',
    format: 'port',
    'default': 8081,
    arg: 'port',
  },
  mongodb_uri: {
    doc: 'The mongodb URL',
    format: '*',
    'default': 'mongodb://localhost:27017/PatientApp',
    arg: 'mongodb_uri'
  }
});

// Load environment dependent configuration
const env = config.get('env');
env.swaggerFile = __dirname + './../../swagger.yaml'

config.loadFile('app/config/app-' + env + '.json');

// Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
