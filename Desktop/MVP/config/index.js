'use strict';

// Production environment settings
let config = {};

// HTTP port for Express
config.port = process.env.PORT || 8080;


let environmentSettings = {};
switch (process.env.NODE_ENV) {
  case 'production': environmentSettings = require('./production'); break;
  default: environmentSettings = require('../app.js'); break;
}

config = Object.assign(config, environmentSettings);


// Export final configuration object
module.exports = config;