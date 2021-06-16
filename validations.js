const db = require("./database");
const util = require("util");
const { error } = require("console");
const query = util.promisify(db.query).bind(db);

async function personValidation(email, apellido, nombre, alias) {
  if (!email || !apellido || !nombre || !alias) {
    throw new Error("faltan datos");
  }

  const persons = await query("SELECT * FROM persona WHERE email= ?", [email]);
  if (persons.length) {
    throw new Error("el email ya se encuentra registrado");
  }
}

async function validatePersonFound(id) {
  const person = await query("SELECT * FROM persona WHERE id=?", [id]);
  if (!person.length) {
    throw new Error("no se encuentra esa persona");
  }
  return person[0];
}

async function validatePersonExist(id) {
  const person = await query("SELECT * FROM persona WHERE id=?", [id]);
  if (!person.length) {
    throw new Error("no existe esa persona");
  }
  return person[0];
}

async function validatePersonHasBook(id) {
  const person = await query("SELECT * FROM libro WHERE persona_id=?", [id]);
  if (person.length) {
    throw new Error("Esa persona tiene libros asociados, no se puede eliminar");
  }
  return person[0];
}

//---------------------------------------------------------------------
async function bookValidation(nombre, descripcion, categoria_id, persona_id) {
  if (!nombre || !categoria_id || !descripcion || !persona_id) {
    throw new Error("faltan datos");
  }
}

async function validateBookFound(id) {
  const book = await query("SELECT * FROM libro WHERE id=?", [id]);
  if (!book.length) {
    throw new Error("no se encuentra ese libro");
  }
  return book[0];
}

async function validateBookExist(id) {
  const book = await query("SELECT * FROM libro WHERE nombre=?", [id]);
  if (book.length) {
    throw new Error("Ya existe ese libro");
  }
  return book[0];
}

async function validateBookLend(id) {
  const book = await query(
    "SELECT * FROM libro WHERE persona_id is NULL AND id=?",
    [id]
  );
  if (book.length) {
    throw new Error("ese libro no esta prestado");
  }
  return book[0];
}

async function validateBookLendDelete(id) {
  const book = await query(
    "SELECT * FROM libro WHERE persona_id is NOT NULL AND id=?",
    [id]
  );
  if (book.length) {
    throw new Error("ese libro esta prestado no se puede borrar");
  }
  return book[0];
}

//---------------------------------------------------------------------
async function categoryValidation(nombre) {
  if (!nombre) {
    throw new Error("faltan datos");
  }
  const category = await query("SELECT * FROM categoria WHERE nombre=?", [
    nombre,
  ]);
  if (category.length) {
    throw new Error("ese nombre de categoria ya existe");
  }
  return category[0];
}

async function validateCategoryFound(id) {
  const category = await query("SELECT * FROM categoria WHERE id=?", [id]);
  if (!category.length) {
    throw new Error("categoría no encontrada");
  }
  return category[0];
}

async function validateCategoryExist(id) {
  const category = await query("SELECT * FROM categoria WHERE id=?", [id]);
  if (!category.length) {
    throw new Error("no existe la categoria indicada");
  }
  return category[0];
}

async function validateCategoryHasBook(id) {
  const category = await query("SELECT * FROM libro WHERE categoria_id=?", [
    id,
  ]);
  if (category.length) {
    throw new Error("categoria con libros asociados, no se puede eliminar");
  }
  return category[0];
}

//PERSONA:
//-faltan datos -> ya está HECHO (PROBADO)
//-error inesperado -> HECHO (contemplado en el catch) (PROBADO)
//-email registrado -> HECHO (PROBADO)
//-no se encuentra esa persona ->HECHO (PROBADO)
//-no existe esa persona -> HECHO (PROBADO)
//-esa persona tiene libros asociados, no se puede eliminar -> HECHO (PROBADO)

//CATEGORIA
//-faltan datos => HECHO (PROBADO)
//-categoria ya existente  -> HECHO (PROBADO)
//-error inesperado -> hecho (PROBADO)
//-categoria no encontrada -> hecho (PROBADO)
//-no existe la categoria -> hecho (PROBADO)
//-categoria con libros asociados, no se puede eliminar -> hecho (PROBADO)

//LIBRO
//-error inesperado -> HECHO (contemplado en el catch) (PROBADO)
//-libro ya existente -> HECHO (PROBADO)
//-nombre y categoria datos obligatorios -> HECHO.
//-no existe la categoria indicada -> HECHO
//-no existe la persona indicada -> HECHO
//-libro prestado, no se puede volver a prestar . FALTA
//-no se encuentra la persona a la q se quiere prestar el libro. FALTA
//-no se encuentra ese libro -> HECHO (PROBADO)
//-ese libro no estaba prestado -> HECHO.
//-no existe ese libro -> HECHO.
//-ese libro esta prestado no se puede borrar -> HECHO (PROBADO)
//-solo se puede modificar la descripcion del libro // FALTA

module.exports = {
  personValidation,
  validatePersonExist,
  validatePersonFound,
  validatePersonHasBook,
  bookValidation,
  validateBookFound,
  validateBookExist,
  validateBookLend,
  validateBookLendDelete,
  categoryValidation,
  validateCategoryFound,
  validateCategoryExist,
  validateCategoryHasBook,
};
