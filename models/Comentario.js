const mongoose =require('mongoose');
const ComentarioSchema= mongoose.Schema({
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
}
});
module.exports=mongoose.model('comentario',ComentarioSchema);