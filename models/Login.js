const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const LoginSchema= mongoose.Schema({

   
    email:{
       type:String,
       required: true
    },
    password:{
    type:String,
    required: true
 },
   });
   LoginSchema.statics.encryptPassword = async (password) => {
      const salt = await bcrypt.genSalt(10)
      return await bcrypt.hash(password, salt)
   }
   module.exports=mongoose.model('login',LoginSchema);
