/**
 * 
 */

'use strict'
/**
 * A constructor to build a 
 * @constructor
 * 
 */

var headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('ResourceVersion', 'v3');

function Client(app_id, app_key) {
  this._app_id = app_id;
  this._app_key = app_key;
  console.log(this._app_id);
  console.log(this._app_key);
}

Client.prototype.findAll = function() {
  
}

module.exports.Client = Client;
module.exports.version = version;