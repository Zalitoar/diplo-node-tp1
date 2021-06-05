const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;

app.use(express.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'passwdadmin',
    database: 'biblioteca',
    insecureAuth : true
  });
  con.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

app.get('/', (request, response) => {
    response.json({ info: 'Biblioteca API' });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

/* con.query('SELECT * FROM personas', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
  }); */
