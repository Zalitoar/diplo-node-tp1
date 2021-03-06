"use strict";

var router = require("express").Router();
const express = require("express");
const {
  categoryValidation,
  validateCategoryFound,
  validateCategoryExist,
  validateCategoryHasBook,
} = require("../validations");
const db = require("../database");

router.use(express.json());

router.get("/categoria", (req, res) => {
  db.query("SELECT * FROM categoria", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

router.get("/categoria/:id", async (req, res) => {
  try {
    const category = await validateCategoryFound(req.params.id);
    res.json(category);
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.post("/categoria", async (req, res) => {
  try {
    await categoryValidation(req.body.nombre);

    db.query(
      "INSERT INTO categoria (nombre) values (?)",
      [req.body.nombre],
      (error, registro) => {
        if (error) {
          throw error;
        }
        if (registro) {
          res.status(200);
        }
      }
    );
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.delete("/categoria/:id", async (req, res) => {
  try {
    await validateCategoryExist(req.params.id);
    await validateCategoryHasBook(req.params.id);
    db.query(
      "DELETE from categoria where id=?",
      [req.params.id],
      (error, registro, campos) => {
        if (error) {
          throw error;
        }
        res.json({ message: "se borró correctamente" });
      }
    );
  } catch (e) {
    res.status(413).json(e.message);
  }
});

module.exports = router;
