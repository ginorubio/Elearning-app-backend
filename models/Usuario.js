const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const UsuarioSchema= mongoose.Schema({

   nombre:{
       type:String,
       required: true
    },
    email:{
       type:String,
       required: true,
    },
    celular:{
      type:Number,
      required: true
   },
   role:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rol'
  },
   password:{
      type:String,
      required: true
   }
   });
   
  UsuarioSchema.statics.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10)
   return await bcrypt.hash(password, salt)
}
   module.exports=mongoose.model('usuario',UsuarioSchema);