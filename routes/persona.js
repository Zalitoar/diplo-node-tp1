'use strict';

var router = require('express').Router();
const express = require('express');
const { personValidation, validatePersonExist, validatePersonFound, validatePersonHasBook } = require("../validations");
const db = require('../database');

router.use(express.json());

router.get('/persona', (req, res) => {
    db.query('SELECT * FROM persona', (err, rows) => { // extraer a modelo
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/persona/:id', async (req, res) => {
    try {
        const person = await validatePersonFound(req.params.id);
        res.json(person);
    }
    catch (e) {
        res.status(413).json(e.message);
    }
});

router.post("/persona", async (req, res) => {
    try {
        await personValidation(req.body.email, req.body.apellido, req.body.nombre, req.body.alias);

        db.query("INSERT INTO persona (nombre,apellido,alias,email) values (?,?,?,?)", [req.body.nombre, req.body.apellido, req.body.alias, req.body.email], (error, registro, campos) => {
            if (error) {
                throw new Error("error al ingresar en la base de datos");
            }
            if (registro) {
                res.status(200).json("persona registrada");
            }
        });
    }
    catch (e) {
        res.status(413).json(e.message);
    }
});


router.put('/persona/:id', async (req, res) => {
    try {
        await validatePersonFound(req.params.id);
        db.query("UPDATE persona SET nombre=?, apellido=?, alias=?, email=? WHERE id=?", [req.body.nombre, req.body.apellido, req.body.alias, req.body.email, req.params.id], async (error, registro, campos) => {
            if (error) {
                throw new Error("error al ingresar en la base de datos");
            }
            const result = await validatePersonFound(req.params.id);
            res.json(result);
        });
    }
    catch (e) {
        res.status(413).json(e.message);
    }
});

router.delete('/persona/:id', async (req, res) => {
    try {
        await validatePersonHasBook(req.params.id);
        db.query("DELETE FROM persona WHERE id=?", [req.params.id], (error, registro, campos) => {
            if (error) {
                throw new Error(error.message);
            }
            res.json({ "message": "se borro correctamente" });
        });
    }
    catch (e) {
        res.status(413).json(e.message);
    }
});

module.exports = router;