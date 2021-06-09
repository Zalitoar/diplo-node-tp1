const { response } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;
const personValidation = require("./validations");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

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

app.post("/persona",(req,res)=>{
  try{
    personValidation(req.body.email, con);
    con.query("insert into personas (nombre,apellido,alias,email) values (?,?,?,?)", [req.body.nombre, req.body.apellido, req.body.alias, req.body.email], (error, registro, campos)=>{
      if (error){
        throw new Error("error al ingresar en la base de datos");
      }
      return registro;
    });
    res.status(201).json();
  }
  catch(e){
    console.log(e);
    res.json(e.message);
  }
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});


/* con.query('SELECT * FROM personas', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
  }); */
