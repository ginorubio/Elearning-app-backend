const mongoose =require('mongoose');
const ComentarioSchema= mongoose.Schema({
//schema de comentario completo
   nombreUser:{
      type:String,
      required: true
   },  
emailUser:{
    type:String,
    required: true
 },
 nombreCurso:{
    type:String,
    required: true
 },
 descripcion:{
   type:String,
   required: true
},
fechaCreacion:{
   type:Date,
   default: Date.now()
}
});
module.exports=mongoose.model('comentario',ComentarioSchema);