/**
 * import modules
 */
var expect = require('chai').expect;
var nock = require('nock');
var Client = require('../lib/index');
var client = new Client('testAppId', 'testAppKey');


/**
 * import test responses
 */
var aircraftTypes = require('./files/aircrafttypes');
var airline = require('./files/airline');
var airlines = require('./files/airlines');
var destination = require('./files/destination');
var destinations = require('./files/destinations');
var flight = require('./files/flight');
var flights = require('./files/flights');


/**
 * test findFlights()
 */
describe('Test query findFlights()', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/flights')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, flights);
  });

  it('Return a string consisting of an array of flights and a version number', function() {
    return client.findFlights()
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.schemaVersion).to.equal('3');
      });
  });
});


/**
 * test findOneFlightById(id)
 */
describe('Test query findOneFlightById(id)', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/flights/1')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, flight);
  });

  it('Return a string consisting of a flight with a version number', function() {
    return client.findOneFlightById('1')
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.id).to.equal(1);
        expect(response.schemaVersion).to.equal('3');
      });
  });
});


/**
 * test findOneCodeshare(id, flightName)
 */
describe('Test query findOneCodeshare(id, flightName)', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/flights/1/codeshare/AA9999')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, flight);
  });

  it('Return a string consisting of a flight and a version number', function() {
    return client.findOneCodeshare('1', 'AA9999')
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.id).to.equal(1);
        expect(response.flightName).equal('AA9999');
        expect(response.schemaVersion).to.equal('3');
      });
  });
});


/**
 * test findDestinations()
 */
describe('Test query findDestinations()', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/destinations')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, destinations);
  });

  it('Return a string consisting of a list of destinations and a version number', function() {
    return client.findDestinations()
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.schemaVersion).to.equal('1');
      });
  });
});


/**
 * test findOneDestinationByIATA(iata)
 */
describe('Test query findOneDestinationByIATA(iata)', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/destinations/BBB')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, destination);
  });

  it('Return a string consisting of a list of destinations and a version number', function() {
    return client.findOneDestinationByIATA('BBB')
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.iata).to.equal('BBB');
        expect(response.schemaVersion).to.equal('1');
      });
  });
});


/**
 * test findAircraftTypes()
 */
describe('Test query findAircraftTypes()', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/aircrafttypes')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, aircraftTypes);
  });

  it('Return a string consisting of a list of aircraft types and a version number', function() {
    return client.findAircraftTypes()
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.schemaVersion).to.equal('1');
      });
  });
});


/**
 * test findAirlines()
 */
describe('Test query findAirlines()', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/airlines')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, airlines);
  });

  it('Return a string consisting of a list airlines and a version number', function() {
    return client.findAirlines()
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.schemaVersion).to.equal('1');
      });
  });
});


/**
 * test findOneAirlineByAirlineCode(airlineCode)
 */
describe('Test query findOneAirlineByAirlineCode(airlineCode)', function() {
  before(function() {
    nock('https://api.schiphol.nl/public-flights')
      .get('/airlines/BB')
      .query({app_id: 'testAppId', app_key: 'testAppKey'})
      .reply(200, airline);
  });

  it('Return a string consisting of a list airlines and a version number', function() {
    return client.findOneAirlineByAirlineCode('BB')
      .then(function(response) {
        expect(typeof response).to.equal('string');
        response = JSON.parse(response);
        expect(response.iata).to.equal('BB');
        expect(response.schemaVersion).to.equal('1');
      });
  });
});



