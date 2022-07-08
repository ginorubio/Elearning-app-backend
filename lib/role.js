const Rol = require('../models/Rol');

const crearRol = async () =>{
    try{
        const cont = await Rol.estimatedDocumentCount();

        if(cont > 0 )
            return;

        const values = await Promise.all([
            new Rol({ nombre: "admin"}).save(),
            new Rol({ nombre: "estudiante"}).save(),
            new Rol({ nombre: "invitado"}).save()
        ]);

        console.log(values);

    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = crearRol;