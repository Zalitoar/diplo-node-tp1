"use strict";

var router = require("express").Router();
const {
  validateBookExist,
  validateBookFound,
  validateBookLend,
  validateBookLendDelete,
  validatePersonExist,
  validatePersonFound,
  validateBookIsNotLend,
  bookValidation,
} = require("../validations");
const db = require("../database");

router.get("/libro", (req, res) => {
  db.query("SELECT * FROM libro", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

router.get("/libro/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const book = await validateBookFound(req.params.id);
    res.json(book);
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.post("/libro", async (req, res) => {
  try {
    await bookValidation(
      req.body.nombre,
      req.body.categoria_id,
      req.body.descripcion,
      req.body.persona_id
    );
    await validateBookExist(req.body.nombre);
    await validatePersonExist(req.body.persona_id);
    db.query(
      "INSERT INTO libro (nombre,descripcion,categoria_id,persona_id) values (?,?,?,?)",
      [
        req.body.nombre,
        req.body.descripcion,
        req.body.categoria_id,
        req.body.persona_id,
      ],
      (error, registro, campos) => {
        if (error) {
          throw error("error al ingresar en la base de datos");
        }
        if (registro) {
          res.status(200).json("libro registrado");
        }
      }
    );
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.put("/libro/:id", async (req, res) => {
  try {
    await validateBookFound(req.params.id);
    db.query(
      "UPDATE libro SET nombre=?, descripcion =?, categoria_id =?, persona_id=? WHERE id=?"
    ),
      [
        req.body.nombre,
        req.body.descripcion,
        req.body.categoria_id,
        req.body.persona_id,
        req.params.id,
      ],
      async (error, registro) => {
        if (error) {
          throw new Error("error al ingresar en la base de datos");
        }
        const result = await validateBookFound(req.params.id);
        res.json(result);
      };
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.put("/libro/prestar/:id", async (req, res) => {
  try {
    await validateBookFound(req.params.id);
    await validatePersonFound(req.body.persona_id);
    await validateBookLend(req.params.id);
    db.query(
      "UPDATE libro SET persona_id = ? WHERE id = ?",
      [req.body.persona_id, req.params.id],
      async (error, registro, campos) => {
        if (error) {
          throw error("error al ingresar en la base de datos");
        }
        if (registro) {
          res.status(200).json("libro prestado");
        }
      }
    );
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.put("/libro/devolver/:id", async (req, res) => {
  try {
    await validateBookFound(req.params.id);
    await validateBookIsNotLend(req.params.id);
    db.query(
      "UPDATE libro SET persona_id = NULL WHERE id = ?",
      [req.params.id],
      (error, registro, campos) => {
        if (error) {
          throw error("error al ingresar en la base de datos");
        }
        if (registro) {
          res
            .status(200)
            .json({ mensaje: "se realizo la devolucion correctamente" });
        }
      }
    );
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.delete("/libro/:id", async (req, res) => {
  try {
    await validateBookFound(req.params.id);
    await validateBookLendDelete(req.params.id);

    db.query(
      "DELETE FROM libro WHERE id=?",
      [req.params.id],
      (error, registro, campos) => {
        if (error) {
          throw error(error.message);
        }
        res.json({ message: "se borro correctamente el libro" });
      }
    );
  } catch (e) {
    res.status(413).json(e.message);
  }
});

module.exports = router;
