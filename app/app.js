var express = require('express');
var bodyParser = require('body-parser');
const config = require('./utils/config');

var {mongoose} = require('./db/mongoose');
var {Patient} = require('./models/patient');
const {setup} = require('./controllers/route');

let swaggerInline = require('swagger-inline');
let swaggerUi = require('swagger-ui-express');
let YAML = require('yamljs');
let swaggerDocument = YAML.load('./swagger.yaml');

var app = express();

app.state = {};
app.state.config = config;

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const routes =  setup();
app.use(routes);

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
