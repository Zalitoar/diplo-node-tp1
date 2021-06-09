'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ "Title": "Index" });
});

router.get('/about', (req, res) => {
    res.json({ "Title": "About" });
});

module.exports = router;