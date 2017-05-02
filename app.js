"use strict";

const express = require('express'),
      router  = require('./router.js'),
      ip      = require("ip");

const app = express();

app.use(router);

app.use( express.static('public') );

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(function(req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
});

app.listen(3000, function () {
  console.dir ( ip.address() + ':3000' );
})