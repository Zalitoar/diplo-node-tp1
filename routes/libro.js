"use strict";

var router = require("express").Router();
const {
  validateBookExist,
  validateBookFound,
  validateBookLend,
  validateBookLendDelete,
  validatePersonExist,
  validateCategoryExist,
} = require("../validations");
const db = require("../database");
router.get("/libro", (req, res) => {
  db.query("SELECT * FROM libro", (err, rows) => {
    // extraer a modelo
    if (err) throw err;
    res.json(rows);
  });
});

// unificar estos dos GET
router.get("/libro/:id", async (req, res) => {
  try {
    const book = await validateBookFound(req.params.id);
    res.json(book);
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.get("/libro/:id", async (req, res) => {
  try {
    const book = await validateBookLend(req.params.id);
    res.json(book);
  } catch (e) {
    res.status(413).json(e.message);
  }
});

router.delete("/libro/:id", async (req, res) => {
  try {
    await validateBookFound(req.params.id); // verfica que exista el libro
    await validateBookLendDelete(req.params.id); //verifica que no se encuentre prestado

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

router.post("/libro", async (req, res) => {
  let id = req.body.id,
    nombre = req.body.nombre,
    categoria = req.body.categoria_id;
  if (!id || id.trim() == "") {
    res.send("Falta definir el id del libro.");
  }
  if (!nombre || nombre.trim() == "") {
    res.send("Falta definir el nombre del libro.");
  }
  if (!categoria || categoria.trim() == "") {
    res.send("Falta definir la categoria del libro.");
  }
  try {
    await validateBookExist(req.body.id);
    await validateCategoryExist(req.body.categoria_id);
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
          res.status(200).json("libro registrada");
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

router.put("/libro/prestar/:id", (req, res) => {
  res.json({ una: "libro" });
});

router.put("/libro/devolver/:id", (req, res) => {
  res.json({ una: "libro" });
});

router.delete("/libro/:id", async (req, res) => {
  try {
    await validateBookLendDelete(req.params.id);
    db.query("DELETE FROM libro WHERE id =?"),
      [req.params.id],
      (error, registro) => {
        if (error) {
          throw Error;
        }
        res.json({ message: "se borró correctamente" });
      };
  } catch (e) {
    res.status(413).json(e.message);
  }
});

module.exports = router;
