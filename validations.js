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

module.exports = personValidation;