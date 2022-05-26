const mongoose =require('mongoose');
const UsuarioSchema= mongoose.Schema({

   idUser:{
      type:Number,
      required: true
   },
   nombre:{
       type:String,
       required: true
    },
    email:{
       type:String,
       required: true
    },
    celular:{
      type:Number,
      required: true
   }
   });
   module.exports=mongoose.model('usuario',UsuarioSchema);