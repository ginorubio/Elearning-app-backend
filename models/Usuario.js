const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const UsuarioSchema= mongoose.Schema({
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
  /*
   UsuarioSchema.pre('save', async function next(){
   try{
      const salt = await bcrypt.gensalt(10)
      const hashedPassword = await bcrypt.hash(this.password, salt)
      this.password=hashedPassword
      next()
   }catch(error){
      next(error)
   }
   })*/
   module.exports=mongoose.model('usuario',UsuarioSchema);