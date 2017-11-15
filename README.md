# schiphol-client-js
A Node.js wrapper for Schiphol Flight API. For more details about the Schiphol Flight API, you can always refer to [here](https://developer.schiphol.nl/). This wrappers contains both v1 and v3 version endpoints from the API.

## Usage
Use the following command to install and save the package in your package.json:
```sh
npm install schiphol-client-js --save
```

To use the client, first import the package and call a query as follows. Each query will return a promise for further chaining.

```javascript
var client = require('schiphol-client-js');

var client = new Client('yourAppId', 'yourAppKey');

client.findFlights().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

To run the tests:
```sh
npm test
```

## API

Note that for all the following ```params```, all parameters should be wrapped in a object and passed to the API. 

### client.findFlights(params)
Return all flights of a specific date. If no parameters are passed, the flights of today will be returned. An example:

```javascript
var params = {
  airline: 'KL',
  flightdirection: 'A'
}
```
For all possible parameters, please check [here](https://developer.schiphol.nl/apis/flight-api/flights#/).

### client.findOneFlightById(id)

Retrieve one flight by its ID. The input ID is mandatory for this function and should be a string.  

### client.findOneCodeshare(id, flightName)

Retrieve a codeshare by the ID and the name of a flight. Both input parameters are mandatory. The ID is a string and the flightName should be a string.

### client.findDestinations(params)

Retrieve a list of destinations. If no parameters are passed, all possible destinations will be returned. For all possible parameters, see [here](https://developer.schiphol.nl/apis/flight-api/destinations#/).

### client.findOneDestinationByIATA(iata)

Retrieve one desitination based on IATA code. The input IATA code is mandatory. An IATA code should be a string.

### client.findAircraftTypes(params)

Retrieve a list of all aircraft types. If no paramters are passed, all aircraft types will be returned. For all optional input parameters, please check [here](https://developer.schiphol.nl/apis/flight-api/aircrafts#/).

### client.findAirlines(params)

Retrieve a list of airlines. If no paramters are passed, all possible airlines will be returned. For all optional input parameters, see [here](https://developer.schiphol.nl/apis/flight-api/airlines#/).

### client.findOneAirlineByAirlineCode(airlineCode)

Retrieve an airline based on an airline code, either IATA code or ICAO code. The input airline code is mandatory. An airline code should be a string.
