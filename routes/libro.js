'use strict';

var router = require('express').Router();
const db = require('../database');

router.get('/libro', (req, res) => {
    db.query('SELECT * FROM libro', (err, rows) => { // extraer a modelo
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/libro/:id',async (req, res) => {
    try{
        const book = await validateBookFound(req.params.id);
        res.json(book);
    }
    catch (e){
        res.status(413).json(e.message);
    }
});

router.get('/libro/:id',async (req, res) => {
    try{
        const book = await validateBookLend(req.params.id);
        res.json(book);
    }
    catch (e){
        res.status(413).json(e.message);
    }
});

router.delete('/libro/:id', async(req, res) => {
    try{
        await validateBookFound(req.params.id); // verfica que exista el libro
        await validateBookLendDelete(req.params.id); //verifica que no se encuentre prestado
        
        db.query("DELETE FROM libro WHERE id=?", [req.params.id], (error, registro, campos)=>{
         if (error){
            throw new Error(error.message);
            }
            res.json({ "message": "se borro correctamente el libro" });
        });
    }
    catch (e) {
        res.status(413).json(e.message);
    }
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