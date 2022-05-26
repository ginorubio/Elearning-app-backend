const req = require("express/lib/request");
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