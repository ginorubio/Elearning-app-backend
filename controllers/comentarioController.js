const req = require("express/lib/request");
const mongoose = require("mongoose");
const { createAsExpression } = require("typescript");
const Comentario = require("../models/Comentario");
const Usuario = require("../models/Usuario");
const Curso = require("../models/Curso");

exports.comentar = async(req, res)=>{
    const session = await mongoose.startSession();
    //session.startTransaction() 
    try {
        console.log(req.body);

        const{emailUser, nombreCurso, descripcion }= req.body;
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
                {$addToSet: { comentarios: {curso: nombreCurso, descripcion: descripcion}}},{session} );

            console.log(usuarioUpdate.matchedCount);
            console.log(usuarioUpdate.modifiedCount);
            
            const cursoUpdate = await cursoColletion.updateOne({nombre: nombreCurso},
                {$addToSet: { comentarios: {usuario: emailUser, descripcion: descripcion}}}, {session}  
                );
            console.log(cursoUpdate.matchedCount);
            console.log(cursoUpdate.modifiedCount);

            let usuario = await Usuario.findOne({emailUser}); 
            console.log(usuario);
        }, transactionOptions);

        if (transactionResult) {
            console.log("Comentario realizado");

        }else{
            console.log("No se ejecuto el comentario");
    
        }

        await session.commitTransaction();
        session.endSession();
        res.json({message: "Comentario guardado"})
        
    } catch (error) {

        await session.abortTransaction();
        session.endSession();

        console.log(error);
        res.status(500).send('Hubo un error');
        
    }

}
