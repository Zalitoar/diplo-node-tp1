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
    res.json({ "una": "persona" });
});

router.post("/persona", (req, res) => {
    try {
        personValidation(req.body.email, db);
        db.query("insert into persona (nombre,apellido,alias,email) values (?,?,?,?)", [req.body.nombre, req.body.apellido, req.body.alias, req.body.email], (error, registro, campos) => {
            if (error) {
                throw new Error("error al ingresar en la base de datos");
            }
            return registro;
        });
        res.status(201).json();
        res.status(201).send("Exito: registro realizado");
    }
    catch (e) {
        console.log(e);
        res.json(e.message);
    }
});

router.put('/persona/:id', (req, res) => {
    res.json({ "una": "persona" });
});

router.delete('/persona/:id', (req, res) => {
    res.json({ "una": "persona" });
});

module.exports = router;