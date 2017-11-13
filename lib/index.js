/**
 * @author Mengqi Yang 
 * @description A Node.js wrapper for Schiphol Flight API
 */

var http = require('http')
  , req_options = require('./internal/_request_option');

'use strict'
/**
 * A constructor to build a 
 * @constructor
 * 
 */

function Client(app_id, app_key) {
  this.options = {
    app_id: app_id,
    app_key: app_key
  }
}

function addParams(path, options) {
  for(var key in options) {
    path = path + key + '=' 
         + options[key] + '&';
  }
  path = path.substring(0, path.length - 1);
  return path;
}

Client.prototype.findAll = function() {
  req_options.path = addParams(req_options.path, this.options);
  console.log(req_options);
  // var req = http.request(req_options, function(res) {
  //   console.log(res);
  // });
}

module.exports = Client;