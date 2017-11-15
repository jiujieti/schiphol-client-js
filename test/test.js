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
    nock('https://api.schiphol.nl/public_flights/flights')
  });

  it('should return an object consisting of an array of flights and a version number', function() {

  });
});
// describe('Flights', function() {
//   describe('', function() {
//     it('should contain all the info of a flight', function() {
//   })
// })})