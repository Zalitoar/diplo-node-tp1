function personValidation(email, con){
    con.query("select * from personas where email= ?",[email], (error, registros, campos)=>{
        if (error){
            throw new Error("error en la consulta");
        }
        if (registros[0]){
            throw new Error("email ya registrado");
        }
    });
}

module.exports = personValidation;