# schiphol-client
A Node.js wrapper for Schiphol Flight API

## Usage
Use the following command to install and save the package in your package.json:
```sh
npm install schiphol-client-js --save
```

To use the client, import the package and call a query as follows. The query will return a promise correspondingly.

```javascript
var client = require('schiphol-client-js');

var client = new Client('yourAppId', 'yourAppKey');

client.findFights().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
```

## API