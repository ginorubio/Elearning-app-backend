const Usuario = require('../models/Usuario');
const Roles = require('../models/Rol');
const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) =>{
 
    let token = req.headers["x-access-token"];

    if (!token) 
    return res.status(403).json({ message: "No token provided" });
    try {     
        if(token !== ''){
            const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
            req.userId = decoded._id;

            const usuario = await Usuario.findById(req.userId, {password: 0});            
            if(!usuario)
                return res.status(401).json({ error: 'usuario no encontrado' });
                next();
        }else{
            return res.status(400).json({error: 'token no válido'})
        }

    } catch (error) {
        return res.status(400).json({error: 'token no válido'})
    }
}
exports.isDBA = async (req,res,next) => {
    try {      
        const usuario = await Usuario.findById(req.userId);
        const role = await Roles.findOne({_id: usuario.role});
        console.log(usuario.nombre);
        console.log(role.nombre);
        if(role.nombre === "admin" ){
            next() 
        }else{
            return res.status(400).json({error: 'no cuenta con los permisos suficientes'})
        }   
    } catch (error) {
        return res.status(400).json({error: 'no válido'});
    }
}


exports.isUser = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.userId);
        const role = await Roles.findOne({_id: usuario.role});
        console.log(usuario.nombre);
        console.log(role.nombre);
        if(role.nombre === "estudiante"|| role.nombre === "admin"){
            next(); 
        }else{
            return res.status(400).json({error: 'no cuenta con los permisos suficientes'})
        }       
    } catch (error) {
        return res.status(400).json({error: 'no válido'});
    }
}