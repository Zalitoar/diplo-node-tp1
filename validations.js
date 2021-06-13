const db = require('./database');
const util = require('util');
const query = util.promisify(db.query).bind(db);

async function personValidation(email, apellido, nombre, alias){
    if(!email || !apellido || !nombre || !alias){
        throw new Error("faltan datos");
    }
    
    const persons = await query("SELECT * FROM persona WHERE email= ?",[email]);
    if (persons.length) {
        throw new Error('email ya registrado')
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

//PERSONA: 
//-faltan datos -> ya está HECHO
//-error inesperado -> HECHO (contemplado en el catch)
//-email registrado -> HECHO
//-no se encuentra esa persona ->HECHO
//-no existe esa persona -> HECHO
//-esa persona tiene libros asociados, no se puede eliminar

//CATEGORIA
//-faltan datos
//-categoria ya existente
//-error inesperado
//-categoria no encontrada
//-no existe la categoria
//-categoria con libros asociados, no se puede eliminar

//LIBRO
//-error inesperado
//-libro ya existente
//-nombre y categoria datos obligatorios
//-no existe la categoria indicada
//-no existe la persona indicada
//-no se encuentra ese libro
//-solo se puede modificar la descripcion del libro
//-ese libro no estaba prestado
//-no existe ese libro
//-ese libro esta prestado no se puede borrar


module.exports = {
    personValidation,
    validatePersonExist,
    validatePersonFound
};