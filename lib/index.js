/**
 * @author Mengqi Yang 
 * @description A Node.js wrapper for Schiphol Flight API
 */

var http = require('https')
  , RequestOptions = require('./internal/_request_option');

'use strict'
/**
 * A constructor to build a client for Schiphol Flight API
 * @constructor
 * 
 */

function Client(app_id, app_key) {
  this.app_params = {
    app_id: app_id,
    app_key: app_key
  }
}

/**
 * 
 */
Client.prototype.findOneFlightById = function(id) {

  return new Promise(function(resolve, reject) {
    if(id == undefined) {
      reject(new Error('Invalid input of flight ID'));
    }
    var req_options = new RequestOptions();
    req_options.addPath('/public-flights/flights/' + id + '?', addParams(this.app_params));

    var req = http.request(req_options, function(res) {
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
 * Return all flights from a specific date
 * Note: If params are passed to the function, the query will return the flights of today
 * @param {Object} params
 */
Client.prototype.findFlights = function(params) {
  var req_options = new RequestOptions();
  req_options.addPath('/public-flights/flights?', addParams(this.app_params), addParams(params));
  
  return new Promise(function(resolve, reject) {
    var req = http.request(req_options, function(res) {
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
 * @param {String} path 
 * @param {Object} options 
 */
function addParams(options) {
  var params = "";
  for(var key in options) {
    params = params + key + '=' 
         + options[key] + '&';
  }
  params = params.substring(0, params.length - 1);
  return params;
}

module.exports = Client;