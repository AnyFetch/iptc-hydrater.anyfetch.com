'use strict';

/**
 * @file Helper for iptc/exif metadata processing
 */

var async = require('async');
var config = require('../config/configuration.js');

var hydrationError = require('anyfetch-file-hydrater').hydrationError;

/**
 * Extract the metadata of the specified iamge file
 *
 * @param {string} path Path of the specified file
 * @param {function} cb Callback, first parameter, is the error if any, then the processed data
 */
module.exports = function(path, document, changes, finalCb) {

};
