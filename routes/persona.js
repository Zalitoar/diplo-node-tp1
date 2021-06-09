'use strict';

var router = require('express').Router();
const db = require('../database');

router.get('/persona', (req, res) => {
    db.query('SELECT * FROM persona', (err, rows) => { // extraer a modelo
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/persona/:persona', (req, res) => {
    res.json({"una": "persona"});
});

module.exports = router;