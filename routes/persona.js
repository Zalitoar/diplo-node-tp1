'use strict';

var router = require('express').Router();
const express = require('express');
const personValidation = require("../validations");
const db = require('../database');

router.use(express.json());

router.get('/persona', (req, res) => {
    db.query('SELECT * FROM persona', (err, rows) => { // extraer a modelo
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/persona/:id', (req, res) => {
    db.query('SELECT * FROM persona WHERE id=?',[req.params.id], (err, rows) => { 
        if (err) throw err;
        res.json(rows);
    });
}); //validaciones del get

router.post("/persona", async (req, res) => {
    try {
        await personValidation(req.body.email, req.body.apellido, req.body.nombre, req.body.alias,  db);
        db.query("INSERT INTO persona (nombre,apellido,alias,email) values (?,?,?,?)", [req.body.nombre, req.body.apellido, req.body.alias, req.body.email], (error, registro, campos) => {
            if (error) {
                throw new Error("error al ingresar en la base de datos");
            }
            return registro;
        });
        res.status(201).json();
    }
    catch (e) {
        console.log(e);
        res.status(413).json(e.message);
    }
});
//hacer validacion de "faltan datos" en persona

router.put('/persona/:id', (req, res) => {
    try{
        db.query("INSERT INTO persona (nombre, apellido, alias, email) values (?,?,?,?)", [req.body.nombre, req.body.apellido, req.body.alias, req.body.email], (error, registro, campos) => {
            if (error) {
                throw new Error("error al ingresar en la base de datos");
            }
            return registro;
        });
    }
    catch (e) {
        res.status(413).json(e.message);  
    }
}); //to do: hacer las validaciones de edicion 

router.delete('/persona/:id', (req, res) => {
    try{
        db.query("DELETE * FROM persona WHERE id=?", [req.params.id], (error, registro, campos)=>{
         if (error){
            throw new Error(error.message);
            }
            return registro;
        });

        res.status(200).json({ "message": "se borro correctamente" }); 
    }
    catch (e) {
        //to do: hacer validaciones para delete

    }
});

module.exports = router;