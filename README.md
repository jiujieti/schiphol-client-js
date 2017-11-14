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

## API

### client.findFligths(params)

### client.findOneFlightById(id)

### client.findOneCodeshare(id, flightName)

### client.findDestinations(params)

### client.findOneDestinationByIATA(iata)

### client.findAircraftTypes(params)

### client.findAirlines(params)

### client.findOneAirlineByAirlineCode(airlineCode)
