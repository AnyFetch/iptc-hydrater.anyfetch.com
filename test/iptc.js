'use strict';

require('should');

var iptcHydrater = require('../lib/');
var anyfetchFileHydrater = require('anyfetch-file-hydrater');

var hydrationError = anyfetchFileHydrater.hydrationError;

describe('Test results', function() {
  it('returns the correct informations', function(done) {
    var document = {
      data: {},
      metadata: {
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    iptcHydrater(__dirname + "/samples/photo.jpg", document, changes, function(err, changes) {
      if(err) {
        done(new Error("It should not have an error"));
      }

      changes.should.have.property('metadata');
      changes.metadata.should.have.property('author');
      changes.metadata.should.have.property('description');
      changes.metadata.should.have.property('keywords');

      changes.metadata.author.should.eql('Frédéric RUAUDEL');
      changes.metadata.description.should.eql('© 2010 Frédéric Ruaudel, All Rights Reserved');
      changes.metadata.keywords.should.eql([ '500px', 'Adulte', 'Blog FR', 'Fotografar2014', 'Homme', 'Personne', 'Xavier Bernard', 'iPhoto' ]);

      done();
    });
  });

  it('returns empty metadata', function(done) {
    var document = {
      data: {},
      metadata: {
      }
    };

    var changes = anyfetchFileHydrater.defaultChanges();

    iptcHydrater(__dirname + "/samples/notag.jpg", document, changes, function(err, changes) {
      if(err) {
        done(new Error("It should not have an error"));
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
