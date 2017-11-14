/**
 * @author Mengqi Yang 
 * @description A Node.js wrapper for Schiphol Flight API
 */

var http = require('https');
var RequestOptions = require('./internal/_request_option');

'use strict'
/**
 * A constructor to build a client for Schiphol Flight API
 * @constructor
 * 
 */

function Client(appId, appKey) {
  this.appParams = {
    app_id: appId,
    app_key: appKey
  }
}

/**
 * Return one flight which matches the input id
 * @param {String|Number} id
 * @return {Promise} for chaining
 */
Client.prototype.findOneFlightById = function(id) {
  if(id == undefined) {
    throw new Error('Invalid input of flight ID');
  }
  var reqOptions = new RequestOptions();
  reqOptions.addPath('/public-flights/flights/' + id + '?', this.appParams);
  return makeRequest(reqOptions);
}

/**
 * Return all flights from a specific date
 * Note: If params are passed to the function, the query will return the flights of today
 * @param {Object} params
 * @return {Promise} for chaining
 */
Client.prototype.findFlights = function(params) {
  var reqOptions = new RequestOptions();
  var newParams = Object.assign({}, this.appParams, params);
  reqOptions.addPath('/public-flights/flights?', newParams);
  return makeRequest(reqOptions);
}

/**
 * Find one codeshare of a flight
 * @param {String|Number} id
 * @param {String} flightName
 * @return {Promise} for chaining
 */
Client.prototype.findOneCodeshare = function(id, flightName) {
  if(id == undefined || flightName == undefined) {
    throw new Error('Invalid input of flight ID or flight name');
  }
  reqOptions.addPath('/public-flights/flights/' + id + '/codeshare/' + flightName + '?', this.appParams);
  return makeRequest(reqOptions);
}

/**
 * Retrieve the list of destinations
 * @param {Object} params
 * @return {Promise} for chaining
 */
Client.prototype.findDestinations = function(params) {
  var reqOptions = new RequestOptions();
  var newParams = Object.assign({}, this.appParams, params);
  reqOptions.addPath('/public-flights/destinations?', newParams);
  reqOptions.changeVersion();
  return makeRequest(reqOptions);
}

/**
 * Retrieve a destination by IATA code
 * @param {String} iata
 * @return {Promise} for chaining
 */
Client.prototype.findOneDestinationByIATA = function(iata) {
  var reqOptions = new RequestOptions();
  reqOptions.addPath('/public-flights/destinations/' + iata + '?', this.appParams);
  reqOptions.changeVersion();
  return makeRequest(reqOptions);
}

/**
 * Retrieve the list of aircrafttypes
 * @param {Object} params
 * @return {Promise} for chaining
 */
Client.prototype.findAircraftTypes = function(params) {
  var reqOptions = new RequestOptions();
  var newParams = Object.assign({}, this.appParams, params);
  reqOptions.addPath('/public-flights/aircrafttypes?', newParams);
  reqOptions.changeVersion();
  return makeRequest(reqOptions);
}

/**
 * Retrieve the list of airlines
 * @param {Object} params
 * @return {Promise} for chaining
 */
Client.prototype.findAirlines = function(params) {
  var reqOptions = new RequestOptions();
  var newParams = Object.assign({}, this.appParams, params);
  reqOptions.addPath('/public-flights/airlines?', newParams);
  reqOptions.changeVersion();
  return makeRequest(reqOptions);
}

/**
 * Retrieve a destination by IATA code
 * @param {String} airlineCode
 * @return {Promise} for chaining
 */
Client.prototype.findOneAirlineByAirlineCode = function(airlineCode) {
  var reqOptions = new RequestOptions();
  reqOptions.addPath('/public-flights/airlines/' + airlineCode + '?', this.appParams);
  reqOptions.changeVersion();
  return makeRequest(reqOptions);
}

/**
 * 
 * @param {Object} reqOptions
 * @return {Promise} for chaining 
 */
function makeRequest(reqOptions) {
  return new Promise(function(resolve, reject) {
    var req = http.request(reqOptions, function(res) {
      var body = [];

      if(res.statusCode < 200 || res.statusCode > 299) {
        reject(new Error('Failed to fectch data, status code: ' + res.statusCode));
      }

      res.on('data', function(chunk) {
        body.push(chunk);
      });

      res.on('end', function() {
        body = Buffer.concat(body).toString();
        resolve(body);
      });

      res.on('error', function(e) {
        reject(e);
      });
    });

    req.end();
  }); 
}

module.exports = Client;