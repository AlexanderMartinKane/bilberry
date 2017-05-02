"use strict";

const express  = require('express');

const { syncClients, checkClient, createResponse } = require('./mongo-db.js');
// const { syncClients, checkClient, createResponse } = require('./mysql-db.js');

const router = express.Router();

router.get('/', [getRequest], (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

router.post('/', [postRequest], (req, res) => {

  let body = '',
      client;

  req.on('data', data => {
    body += data;
  });

  req.on('end', () => {

    try {
      client = JSON.parse(body);
    } catch (error) {
      console.log("Wrong data\n", error);
    }

    console.log('Recieved data: ', client);

    if (client && "name" in client && "phone" in client) {

      new Promise( resolve => syncClients(resolve) )
        .then( clients => checkClient(clients, client) )
        .then( answer => createResponse(answer, client) )
        .then( response => res.send(response) );

    } else {

      const response = {"answer": "Отсутствует поле имени и/или поле телефона: "};
      res.send(response);
      console.log(response.answer + client);
      console.log(`Sent data: ${response.answer}`);

    }

  });

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Request-Method', '*');
  res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
  res.set('Access-Control-Allow-Headers', '*');
});

function getRequest(req, res, next) {
  console.log('\nGET request');
  console.log( `Time: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}`);
  next();
}

function postRequest(req, res, next) {
  console.log('\nPOST request');
  console.log( `Time: ${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}\n`);
  next();
}

module.exports = router;