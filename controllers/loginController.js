const req = require("express/lib/request");
const Login = require("../models/Login");

exports.loginUsuario = async (req, res) => {
    try{
        const {email,password} = req.body;
    
        const newUser = new Login({
            email,  
            password: await Login.encryptPassword(password)
        })
        //console.log(newUser);
        await newUser.save();
        res.send(newUser._id);
    }
    catch (error) 
    {
            console.log(error);
            res.status(500).send('Hubo un error');
            
        }
    }
    
