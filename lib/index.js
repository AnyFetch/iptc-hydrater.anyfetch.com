'use strict';

/**
 * @file Helper for iptc/exif metadata processing
 */

var ex = require('exiv2');

var hydrationError = require('anyfetch-file-hydrater').hydrationError;

/**
 * Extract the metadata of the specified iamge file
 *
 * @param {string} path Path of the specified file
 * @param {function} cb Callback, first parameter, is the error if any, then the processed data
 */
module.exports = function(path, document, changes, finalCb) {
  ex.getImageTags(path, function(err, tags) {
    if(err) {
      return finalCb(new hydrationError(err), changes);
    }
    if(!tags) {
      return finalCb(null, changes);
    }

    changes.metadata.author = tags['Iptc.Application2.Byline'];
    changes.metadata.description = tags['Iptc.Application2.Caption'];
    changes.metadata.keywords = tags['Xmp.dc.subject'].split(',');
    changes.metadata.keywords = changes.metadata.keywords.map(function(str) {
      return str.trim();
    });

    finalCb(err, changes);
  });
};