'use strict';

var router = require('express').Router();
const express = require('express');
//const personValidation = require("../validations");

const db = require('../database');

router.get('/categoria', (req, res) => {
    db.query('SELECT id, nombre FROM categoria', (err, rows) => { 
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/categoria/:id', (req, res) => {
    db.query('SELECT id, nombre FROM categoria WHERE id = ?', [req.params.id], (err, rows) => { 
        if (err) throw err;
        res.json(rows);
    });
});

router.post('/categoria', (req, res) => {
    try {
        //personValidation(req.body.email, db);
        db.query("insert into categoria (nombre) values (?)", [req.body.nombre]);
        res.status(201).json();
        console.log(JSON({id: res.body.id, nombre: res.body.nombre}));
    }
    catch (e) {
        console.log(e);
        res.json(e.message);
    }
});

router.delete('/categoria/:id', (req, res) => {
    try {
        console.log(req.path.id);
        //personValidation(req.body.email, db);
        db.query("delete from categoria where id = ?", [req.path.id], (error, registro, campos) => {
            if (error) {
                throw new Error("error al ingresar en la base de datos");
            }
            return registro;
        });
        res.status(201).json();
    }
    catch (e) {
        console.log(e);
        res.json({"mensaje": e.message});
    }
});

module.exports = router;