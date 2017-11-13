/**
 * @author Mengqi Yang 
 * @description A Node.js wrapper for Schiphol Flight API
 */

var http = require('https');
var querystring = require('querystring');
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
 * @param {string|number} id
 */
Client.prototype.findOneFlightById = function(id) {
  if(id == undefined) {
    throw new Error('Invalid input of flight ID');
  }
  var reqOptions = new RequestOptions();
  reqOptions.addPath('/public-flights/flights/' + id + '?', querystring.stringify(this.appParams));
  return makeRequest(reqOptions);
}

/**
 * Return all flights from a specific date
 * Note: If params are passed to the function, the query will return the flights of today
 * @param {Object} params
 */
Client.prototype.findFlights = function(params) {
  var reqOptions = new RequestOptions();
  Object.assign(params, appParams, params);
  reqOptions.addPath('/public-flights/flights?', querystring.stringify(params));
  return makeRequest(reqOptions);
}

/**
 * Find one codeshare of a flight
 */
Client.prototype.findOneCodeshare = function(id, flightName) {
  if(id == undefined || flightName == undefined) {
    throw new Error('Invalid input of flight ID or flight name');
  }
  reqOptions.addPath('/public-flights/flights/' + id + '/codeshare/' + flightName + '?', querystring.stringify(this.appParams));
  return makeRequest(reqOptions);
}

/**
 * 
 * @param {object} reqOptions 
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

/**
 * A helper function to build query parameters
 * @param {string} path 
 * @param {Object} options 
 */
// function addParams(options) {
//   var params = "";
//   for(var key in options) {
//     params = params + key + '=' 
//          + options[key] + '&';
//   }
//   params = params.substring(0, params.length - 1);
//   return params;
// }

module.exports = Client;