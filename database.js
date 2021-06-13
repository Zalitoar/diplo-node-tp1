'use strict';

var config = require('./sample.config');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.pwd,
    database: config.db.name,
    insecureAuth: true
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = db;