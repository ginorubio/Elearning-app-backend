//const bcrypt = require("bcryptjs/dist/bcrypt");
const bcrypt = require('bcrypt');
const req = require("express/lib/request");
const Usuario = require("../models/Usuario");
const Rol = require('../models/Rol');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {

    try {
        const {email,password} = req.body;
        let userFound = await Usuario.findOne({email: email}); 
        if (!userFound) return res.status(400).json({ message: "User Not Found" });    
        const matchPassword = await bcrypt.compare(password, userFound.password);
          if (!matchPassword)
          return res.status(401).json({
            token: null,
            message: "Invalid Password",
          });
          const token = jwt.sign({_id: userFound._id }, process.env.TOKEN_SECRET, {
            expiresIn: '24h', // 24 hours
          });     
          res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.signUp = async (req, res)=>{
try {
    const{nombre, email,celular, password}= req.body
    let newUser = await Usuario.findOne({email})||null;
    if(newUser!==null){
        //Usuario si existe
        return res.status(400).json({
            msj:'El usuario ya existe'
        });
    }
    const usuario = new Usuario({
        nombre,
        email,
        celular,
        password: await Usuario.encryptPassword(password)
    })
    const rol = await Rol.findOne({nombre: "invitado"});
    usuario.role = rol._id;   
    const savedUser = await usuario.save();
    const token = jwt.sign({_id: savedUser._id }, process.env.TOKEN_SECRET, {
        expiresIn: '24h',//24 hours
      });
      return res.status(200).json({ token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

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