//const bcrypt = require("bcryptjs/dist/bcrypt");
const bcrypt = require('bcrypt');
const req = require("express/lib/request");
const Usuario = require("../models/Usuario");


exports.login = async (req, res) => {

    try {
        const {email, password} = req.body;
        let usuario = await Usuario.find({email});      
        let hashedPassword = usuario[0].password
        let isCorrectPasswprd = await bcrypt.compare(password, hashedPassword);
        if(isCorrectPasswprd){
            res.json(usuario[0]);
        }else{
            res.json({message: "password incorrect"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



exports.signUp = async (req, res)=>{

    const{nombre, email, celular, password}= req.body
    const newUser = new Usuario({
        nombre,
        email,
        celular,
        password: await Usuario.encryptPassword(password)
    })
    usuario= await Usuario.find({email}, {password})    
    console.log(newUser);
    await newUser.save();
    res.send(newUser);
}



    


/*
exports.crearUsuario=async(req, res)=>{
try {
    let usuario;
    usuario=new Usuario(req.body);
    await usuario.save();
    res.send(usuario);

    
} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
    
}

}*/
exports.obtenerUsuarios= async(req,res)=>{
    try {
        const usuarios= await Usuario.find();
        res.json(usuarios)
        
    } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
    
    }
}
exports.modificarUsuario=async(req, res)=>{
    try {
        const{nombre, email,celular,password}=req.body;
        let usuario = await Usuario.findById(req.params.id);
        if(!usuario){
            res.status(404).json({msg: 'no existe el usuario'})
        }
        
        usuario.nombre= nombre;
        usuario.email= email;
        usuario.celular= celular;
        usuario.password= password;
        
        usuario= await Usuario.findByIdAndUpdate({_id:req.params.id}, usuario, {new:true})      
        res.json(usuario);

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error');
    }
}
exports.obtenerUsuario=async(req, res)=>{
    try {
      
        let usuario = await Usuario.findById(req.params.id);
        if(!usuario){
            res.status(404).json({msg: 'no existe el usuario'})
        }
        
        res.json(usuario);

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error');
    }
}
exports.eliminarUsuario=async(req, res)=>{
    try {
      
        let usuario = await Usuario.findById(req.params.id);
        if(!usuario){
            res.status(404).json({msg: 'no existe el usuario'})
        }
        await Usuario.findOneAndRemove({_id: req.params.id})
        res.json({msg:'Usuario eliminado exitosamente'});

    } catch (error) {
        console.log(error);
    res.status(500).send('Hubo un error');
    }
}
/*
exports.infoCursos=async(req,res)=>{
    try {
const usuarios= await Usuario.aggregate([
    {
      $lookup: {
        from: "cursos",
        localField: "_id",
        foreignField: "usuario_id",
        as: "cursos_order",
      },
    },
   
    {
      $unwind: "$cursos_order",
    },
  ])
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}catch (error) {
    console.log(error);
res.status(500).send('Hubo un error');
}
}
*/