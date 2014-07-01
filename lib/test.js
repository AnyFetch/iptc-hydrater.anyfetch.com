'use strict';

var ex = require('exiv2');

ex.getImageTags('./photo.jpg', function(err, tags) {
  console.log("DateTime: " + tags["Exif.Image.DateTime"]);
  console.log("DateTimeOriginal: " + tags["Exif.Photo.DateTimeOriginal"]);
});