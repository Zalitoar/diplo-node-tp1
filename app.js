'use strict';

const express = require('express');
const app = express();

app.use(require('./routes/index'));
app.use(require('./routes/persona'));
app.use(require('./routes/categoria'));
app.use(require('./routes/libro'));

var config = require('./sample.config');
const port = config.server.port;

app.use(express.json());

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

exports.app = app;