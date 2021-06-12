'use strict';

var router = require('express').Router();
const db = require('../database');

router.get('/libro', (req, res) => {
    db.query('SELECT * FROM libro', (err, rows) => { // extraer a modelo
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/libro/:libro', (req, res) => {
    res.json({"un": "libro"});
});

router.post('/libro', (req, res) => {
    res.json({ "una": "libro" });
});

router.put('/libro/:id', (req, res) => {
    res.json({ "una": "libro" });
});

router.put('/libro/prestar/:id', (req, res) => {
    res.json({ "una": "libro" });
});

router.put('/libro/devolver/:id', (req, res) => {
    res.json({ "una": "libro" });
});

router.delete('/libro/:id', (req, res) => {
    res.json({ "una": "libro" });
});

module.exports = router;