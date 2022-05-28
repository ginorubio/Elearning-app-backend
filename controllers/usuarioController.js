const req = require("express/lib/request");
const Usuario = require("../models/Usuario");

/*exports.signUp = async (req, res) => {
    const {nombre, email, celular, password} = req.body;

    const newUser = new Usuario({
        nombre,
        email,
        celular,
        password: await Usuario.encryptPassword(password)
    })
    console.log(newUser);
    res.json('signup');
}
*/
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