'use strict';

require('should');

var iptcHydrater = require('../lib/');
var anyfetchFileHydrater = require('anyfetch-file-hydrater');

var hydrationError = anyfetchFileHydrater.hydrationError;

describe('Test results', function() {
  it('returns the correct informations (photo.jpg)', function(done) {
    var document = {
      data: {},
      metadata: {
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    iptcHydrater(__dirname + "/samples/photo.jpg", document, changes, function(err, changes) {
      if(err) {
        done(err);
      }

      changes.should.have.property('metadata');
      changes.metadata.should.have.property('author', 'Frédéric RUAUDEL');
      changes.metadata.should.have.property('description', '© 2010 Frédéric Ruaudel, All Rights Reserved');
      changes.metadata.should.have.property('keywords', '500px, Adulte, Blog FR, Fotografar2014, Homme, Personne, Xavier Bernard, iPhoto');

      done();
    });
  });

  it('returns the correct informations (demo.jpg, no accents)', function(done) {
    var document = {
      data: {},
      metadata: {
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    iptcHydrater(__dirname + "/samples/demo.jpg", document, changes, function(err, changes) {
      if(err) {
        done(err);
      }

      changes.should.have.property('metadata');
      changes.metadata.should.have.property('author', 'Michael W. Steidl');
      changes.metadata.should.have.property('description', 'Thousands gather on the Townhall Square in Vienna to watch Mountainbike Freeriders competing for the Vienna Air King trophy on 3 April 2011.');
      changes.metadata.should.have.property('keywords', 'mountain bike, cycling, Vienna Air King');

      done();
    });
  });

  it('returns empty metadata (photo_2.jpg, no match)', function(done) {
    var document = {
      data: {},
      metadata: {
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    iptcHydrater(__dirname + "/samples/photo_2.jpg", document, changes, function(err, changes) {
      if(err) {
        done(err);
      }

      changes.should.have.property('metadata');
      changes.metadata.should.eql({});

      done();
    });
  });

  it('returns empty metadata (notag.jpg, no metadata)', function(done) {
    var document = {
      data: {},
      metadata: {
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    iptcHydrater(__dirname + "/samples/notag.jpg", document, changes, function(err, changes) {
      if(err) {
        done(err);
      }

      changes.should.have.property('metadata');
      changes.metadata.should.eql({});

      done();
    });
  });

  it('returns an error', function(done) {
    var document = {
      data: {},
      metadata: {
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    iptcHydrater(__dirname + "/samples/notfound.jpg", document, changes, function(err, changes) {
      if(err) {
        done();
      } else {
        done(new Error("An error should have been raised (file does not exist)"));
      }
    });
  });
});
