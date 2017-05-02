"use strict";

const express  = require('express'),
      mysql    = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'bilberry'
});

connection.connect(err => {
  !err ? console.log("MySQL: Database is connected") : console.log("MySQL: Error connecting database")
});

let database = [],
    id;

function syncClients(resolve) {

  connection.query("select * from clients order by id asc", (error, rows) => {

    if (error) {
      console.log('Error while performing Query');
    } else {
      database = rows;
      rows.length === 0 ? id = 0 : id = rows[rows.length - 1].id + 1;
      resolve ? resolve(rows) : console.log("\nDatabase:\n", database, "\n");
    }

  })

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
  connection.query(`insert into clients (id, name, phone, email) values (${id}, '${client.name}', '${client.phone}', '${client.email}')`, err => {
    !err ? console.log(`\nNew client added`) : console.log('Error while performing Query');
  });
}

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
    syncClients();
  }

  console.log(`Sent data: ${response.answer}`);

  return response;
};

module.exports = { syncClients, checkClient, createResponse };