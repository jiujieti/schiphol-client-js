var Client = require('../lib/index');

var client = new Client('f0fa0a19', '136dd9a4ce628d307cb0fbbc89df8c66');
// client.findFlights().then(
//   (data) => {
//     console.log(data);
//   }
// );

// var options = {
//   airline: 'KL'
// };
// client.findFlights(options).then(
//   (data) => {
//     console.log(data);
//   }
// );

 client.findOneFlightById(123063231720956892).then((data) => {console.log(data)}); 

// client.findOneFlightById().then((data) => {console.log(data)}).catch((e) => {console.log(e)}); 
