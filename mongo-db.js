"use strict";

const mongoose = require('mongoose'),
      assert   = require('assert');

mongoose.Promise = require('bluebird');

let isConnectedBefore = false;

const connect = () => mongoose.connect( 'mongodb://localhost:27017/test', { server: { auto_reconnect: true } } );

connect();

const db = mongoose.connection;

db.on( 'error', () => console.error('MongoDB: Could not connect to database') );
db.once( 'open', () => console.log('MongoDB: Database is connected') );

db.on( 'disconnected', () => {
  console.log('MongoDB: Lost the database connection');
  if (!isConnectedBefore) connect();
});

db.on( 'connected', () => {
  isConnectedBefore = true;
  console.log('MongoDB: Connection to the database is established');
});

db.on('reconnected', () => {
  console.log('MongoDB: Reconnected to the database');
});

process.on('SIGINT', () => {
  db.close( () => {
    console.log('MongoDB: Force to close the database conection');
    process.exit(0);
  });
});

const clientsSchema = mongoose.Schema({
  'name'       : String,
  'phone'      : String,
  'email'      : String
}, {
  'collection' : 'clients'
});

const Client = mongoose.model("Client", clientsSchema);

function syncClients(resolve) {

  let query = Client.find( {}, (error, data) => {

    if (error) {
      console.log('Error while performing a Query');
    } else {
      resolve ? resolve(data) : console.log("\nDatabase:\n", data, "\n");
    }
    
  });

  assert.equal( query.exec().constructor, require('bluebird') );
};

function checkClient(clients, client) {

  for (let i = 0; i < clients.length; i++) {

    if (clients[i].phone === client.phone) {
      return true;
    } else continue;

    return false;
  }

};

function addClient(client) {

  const newClient = new Client({
    'name'  : client.name,
    'phone' : client.phone,
    'email' : client.email
  });

  newClient.save( error => !error ? console.log('New client added') : console.error(error) )
    .then( () => syncClients() );
};

function createResponse(answer, client) {

  let response;

  if (answer) {

    response = {
      "answer": "<b>" + client.name + "</b>, Ваша заявка находится в очереди на рассмотрение. " +
        "Ожидайте, пожалуйста, наш менеджер свяжется с Вами в ближайшее время. " +
        "Благодарим за терпение."
    };

  } else {

    response = {
      "answer": "Благодарим за заявку, <b>" + client.name +
        "</b>. Мы свяжемся с Вами в течении 48 часов для подтверждения заказа."
    };

    addClient(client);
  }

  console.log(`Sent data: ${response.answer}`);

  return response;
};

module.exports = { syncClients, checkClient, createResponse };

// /* 
//  * Mongoose by default sets the auto_reconnect option to true.
//  * We recommend setting socket options at both the server and replica set level.
//  * We recommend a 30 second connection timeout because it allows for 
//  * plenty of time in most operating environments.
//  */
// var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
//                 replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
// var mongodbUri = 'mongodb://user:pass@host:port/db';
 
// mongoose.connect(mongodbUri, options);
// var conn = mongoose.connection;             
 
// conn.on('error', console.error.bind(console, 'connection error:'));  
 
// conn.once('open', function() {
//   // Wait for the database connection to establish, then start the app.                         
// });