'use strict';

var router = require('express').Router();
const express = require('express');
const {categoryValidation,validateCategoryFound,validateCategoryExist,validateCategoryDelete} = require("../validations");
const db = require('../database');

router.use(express.json());

router.get('/categoria', (req, res) => {
        db.query('SELECT * FROM categoria', (err, rows) => {  
            if (err) throw err;
            res.json(rows);
    })
});

router.get('/categoria/:id', async (req, res) => {
    try{
        const category = await validateCategoryFound(req.params.id);
        res.json(category);
        }
        catch(e){
            res.status(413).json(e.message);
        }
});

router.post('/categoria', (req, res) => {
    try {
        await categoryValidation (req.body.nombre);

        db.query("INSERT INTO categoria (nombre) values (?)", [req.body.nombre], (error, registro) => {
            if (error) {
                throw new Error ("error al ingresar en la base de datos");
            }
            if (registro) {
               res.status(200) 
            }
        });
    }
    catch (e) {
        res.status(413).json(e.message);
    }
});

router.delete('/categoria/:id', async(req, res) => {
    try { 
        await validateCategoryDelete(req.params.id);
    
        db.query("delete from categoria where id = ?", [req.params.id], (error, registro, campos) => {
            if (error) {
                throw new Error(error.message);
            }
           res.json({"message": "se borró correctamente"})
        });
    }
    catch (e) {
       res.status(413).json(e.message)
    }
});

module.exports = router;