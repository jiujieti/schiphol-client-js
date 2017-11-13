/**
 * A constructor for request options, only path within the options needs to be added
 * @constructor 
 */
function RequestOptions() {
  return {
    'method': 'GET',
    'hostname': 'api.schiphol.nl',
    'port': null,
    'headers': {
      'resourceversion': 'v3',
      'content-type': 'application/json',
    },
    addPath: function(base, params) {
      this.path = base + params;
    }
  };
}

module.exports = RequestOptions;