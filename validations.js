const db = require('./database');
const util = require('util');
const { error } = require('console');
const query = util.promisify(db.query).bind(db);

async function personValidation(email, apellido, nombre, alias){
    if(!email || !apellido || !nombre || !alias){
        throw new Error("faltan datos");
    }
    
    const persons = await query("SELECT * FROM persona WHERE email= ?",[email]);
    if (persons.length) {
        throw new Error("el email ya se encuentra registrado")
    }
}

async function validatePersonFound(id){
    const person = await query("SELECT * FROM persona WHERE id=?",[id]);
    if (!person.length){
        throw new Error("no se encuentra esa persona")
    }
    return person[0];
}

async function validatePersonExist(id){
    const person =await query("SELECT * FROM persona WHERE id=?",[id]);
    if (!person.length){
        throw new Error("no existe esa persona")
    }
    return person[0];
}


//---------------------------------------------------------------------
async function bookValidation(nombre, descripcion, categoria){
    if(!nombre || !categoria){
        throw new Error("faltan datos");
        }
}

async function validateBookFound(id){
    const book = await query("SELECT * FROM libro WHERE id=?",[id]);
    if (!book.length){
        throw new Error("no se encuentra ese libro")
    }
    return book[0];
}

async function validateBookExist(id){
    const book = await query("SELECT * FROM libro WHERE id=?",[id]);
    if (book.length){
        throw new Error("Ya existe ese libro")
    }
    return book[0];
}

async function validateBookLend(id){
    const book = await query("SELECT * FROM libro WHERE persona_id is NULL AND id=?",[id]);
    if (book.length){
        throw new Error("ese libro no esta prestado")
    }
    return book[0];
}

async function validateBookLendDelete(id){
    const book = await query("SELECT * FROM libro WHERE persona_id is NOT NULL AND id=?",[id]);
    if (book.length){
        throw new Error("libro prestado, no se puede puede borrar")
    }
    return book[0];
}

//---------------------------------------------------------------------
async function categoryValidation (nombre){
if (!nombre ) {
    throw new Error("faltan datos")};

    const category = await query("SELECT * FROM categoria WHERE cateogria=?",[categoria]);
    if (categoria.length) {
        throw new Error ("ese nombre de categoria ya existe")
    }
};

async function validateCategoryFound (id){
    const category = await query("SELECT * FROM categoria WHERE id=?", [id]);
    if (!categoria.length) {
    throw new Error("categoría no encontrada")
}
return categoria[0]
};

async function validateCategoryExist (id) {
    const category= await query("SELECT * FROM categoria WHERE id=?", [id]); 
    if (!categoria.length) {
        throw new Error("no existe la categoria indicada")
    }
    return categoria[0];
}

async function validateCategoryDelete (id){
const category= await query("SELEC * FROM categoria WHERE categoria_id is NOT NULL AND id=?", [id]);
if (categoria.length) {
    throw new Error("categoria con libros asociados, no se puede eliminar")
}
return categoria[0];
}


//PERSONA: 
//-faltan datos -> ya está HECHO
//-error inesperado -> HECHO (contemplado en el catch)
//-email registrado -> HECHO
//-no se encuentra esa persona ->HECHO
//-no existe esa persona -> HECHO
//-esa persona tiene libros asociados, no se puede eliminar

//CATEGORIA
//-faltan datos => HECHO
//-categoria ya existente 
//-error inesperado
//-categoria no encontrada 
//-no existe la categoria 
//-categoria con libros asociados, no se puede eliminar 

//LIBRO
//-error inesperado
//-libro ya existente -> HECHO
//-nombre y categoria datos obligatorios -> HECHO.
//-no existe la categoria indicada
//-no existe la persona indicada
//-no se encuentra ese libro
//-solo se puede modificar la descripcion del libro
//-ese libro no estaba prestado -> HECHO.
//-no existe ese libro -> HECHO.
//-ese libro esta prestado no se puede borrar -> HECHO.


module.exports = {
    personValidation,
    validatePersonExist,
    validatePersonFound,
    bookValidation,
    validateBookFound,
    validateBookExist,
    validateBookLend,
    validateBookLendDelete,
    categoryValidation,
    validateCategoryFound,
    validateCategoryExist,
    validateCategoryDelete    
};