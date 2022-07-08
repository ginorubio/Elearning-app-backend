const req = require("express/lib/request");
const mongoose = require("mongoose");
const { createAsExpression } = require("typescript");
const Suscripcion = require("../models/Suscripcion");
const Usuario = require("../models/Usuario");
const Curso = require("../models/Curso");

//CONSTRUIR TRANSACTION
exports.suscribir = async(req, res)=>{
    const session = await mongoose.startSession();
    //session.startTransaction() 
    try {
        console.log(req.body);

        const{emailUser, nombreCurso, fechaSuscripcion }= req.body;
       //session =  await mongoose.startSession();

        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local'},
            writeConcern: { w: 'majority'}
        };
        
        const transactionResult = await session.withTransaction( async () =>{
            console.log("Ejecucion callback");
            let userCollection = Usuario.collection

            let cursoColletion = Curso.collection
            const usuarioUpdate = await userCollection.updateOne({email: emailUser },
                {$addToSet: { suscripciones: {curso: nombreCurso, fechaSuscripcion: new Date(fechaSuscripcion)}}},{session} );

            console.log(usuarioUpdate.matchedCount);
            console.log(usuarioUpdate.modifiedCount);
            
            const cursoUpdate = await cursoColletion.updateOne({nombre: nombreCurso},
                {$addToSet: { suscriptores: {usuario: emailUser, fechaSuscripcion: new Date(fechaSuscripcion)}}}, {session}  
                );
            console.log(cursoUpdate.matchedCount);
            console.log(cursoUpdate.modifiedCount);

            let usuario = await Usuario.findOne({emailUser}); 
            console.log(usuario);
        }, transactionOptions);

        if (transactionResult) {
            console.log("Suscripcion exitosa");

        }else{
            console.log("No se ejecuto la suscripcion");
        }

        await session.commitTransaction();
        session.endSession();
        res.json({message: "Suscripcion guardada"})
        
    } catch (error) {

        await session.abortTransaction();
        session.endSession();

        console.log(error);
        res.status(500).send('Hubo un error');
        
    }

}