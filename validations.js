function personValidation(email, db){
    db.query("select * from persona where email= ?",[email], (error, registros, campos)=>{
        if (error){
            throw new Error("error en la consulta");
        }
        if (registros[0]){
            throw new Error("email ya registrado");
        }
    });
}

//PERSONA: 
//-faltan datos 
//-error inesperado 
//-no se encuentra esa persona 
//-no existe esa persona 
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


module.exports = personValidation;