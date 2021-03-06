const req = require("express/lib/request");
const mongoose = require("mongoose");
const { db } = require("../models/Curso");
const Curso = require("../models/Curso");

exports.crearCurso=async(req, res)=>{
try {
    let curso;
    curso=new Curso(req.body);
    await curso.save();
    res.send(curso);

    
} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
    
}

}
exports.obtenerCursos= async(req,res)=>{
    try {
        const cursos= await Curso.find();
        res.json(cursos)
        
    } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
    
    }
}
exports.modificarCurso=async(req, res)=>{
    try {
        const{nombre, categoria,valoracion,descripcion,topico, duracion, enlace, precio}=req.body;
        let curso = await Curso.findById(req.params.id);
        if(!curso){
            res.status(404).json({msg: 'no existe el curso'})
        }
        curso.nombre= nombre;
        curso.categoria= categoria;
        curso.valoracion= valoracion;
        curso.descripcion= descripcion;
        curso.topico= topico;
        curso.duracion= duracion;
        curso.enlace= enlace;
      
        curso.precio= precio;
        


        curso= await Curso.findByIdAndUpdate({_id:req.params.id}, curso, {new:true})
        res.json(curso);

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error');
    }
}
exports.obtenerCurso=async(req, res)=>{
    try {
      
        let curso = await Curso.findById(req.params.id);
        if(!curso){
            res.status(404).json({msg: 'no existe el curso'})
        }
        
        res.json(curso);

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error');
    }
}
exports.eliminarCurso=async(req, res)=>{
    try {
      
        let curso = await Curso.findById(req.params.id);
        if(!curso){
            res.status(404).json({msg: 'no existe el curso'})
        }
        await Curso.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Curso eliminado exitosamente'});

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error');
    }
}

exports.topValoracion= async(req,res)=>{
    try {
        const cursos= await Curso.find({"valoracion":"5"});
        res.json(cursos)
        
    } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
    
    }
}
exports.obtenerGratuitos= async(req,res)=>{
    try {
        const cursos= await Curso.find({"precio":0});
        res.json(cursos)
        
    } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
    
    }
}
exports.buscarCurso=async(req, res)=>{
    try {
        const{nombre}=req.body;
        let curso = await Curso.find({nombre});
        if(!curso){
            res.status(404).json({msg: 'no existe el curso'})
        }
        curso.nombre= nombre;
        //curso= await Curso.find({nombre})
        res.json(curso);

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error');
    }
}

exports.agreggation = async(req, res)=>{
    //Cursos mejor valorados de la categoria informatica
        try {  
        const cursos= await Curso.aggregate([
            { $match: { categoria : "Informatica",
            valoracion: { $gt: 4 }  }}],
            )
        res.json(cursos)
        }catch (error) {
            console.log(error);
        res.status(500).send('Hubo un error');
        }
    }

