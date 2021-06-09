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

module.exports = router;