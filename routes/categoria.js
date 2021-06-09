'use strict';

var router = require('express').Router();
const db = require('../database');

router.get('/categoria', (req, res) => {
    db.query('SELECT * FROM categoria', (err, rows) => { // extraer a modelo
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/categoria/:categoria', (req, res) => {
    res.json({"una": "categoria"});
});

module.exports = router;