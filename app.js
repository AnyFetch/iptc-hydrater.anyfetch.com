'use strict';

// Load configuration and initialize server
var anyfetchFileHydrater = require('anyfetch-hydrater');

var config = require('./config/configuration.js');

config.hydrater_function = __dirname + '/lib/index.js';

var server = anyfetchFileHydrater.createServer(config);

// Expose the server
module.exports = server;
