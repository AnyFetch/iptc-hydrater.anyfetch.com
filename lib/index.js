'use strict';

/**
 * @file Helper for iptc/exif metadata processing
 */

var ex = require('exiv2');

var hydrationError = require('anyfetch-file-hydrater').hydrationError;

/**
 * Extract the metadata of the specified image file
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

    var selection = {
      author: 'Iptc.Application2.Byline',
      description: 'Iptc.Application2.Caption',
      keywords: 'Xmp.dc.subject'
    };

    for(var key in selection) {
      if(tags.hasOwnProperty(selection[key])) {
        changes.metadata[key] = tags[selection[key]];
      }
    }

    finalCb(err, changes);
  });
};