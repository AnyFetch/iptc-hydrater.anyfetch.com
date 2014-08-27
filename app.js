'use strict';

// Load configuration and initialize server
var anyfetchFileHydrater = require('anyfetch-hydrater');

var config = require('./config/configuration.js');

var serverConfig = {
  concurrency: config.concurrency,
  hydrater_function: './lib/index.js'
};

var server = anyfetchFileHydrater.createServer(serverConfig);

// Expose the server
module.exports = server;
