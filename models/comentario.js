const mongoose =require('mongoose');
const CursoSchema= mongoose.Schema({
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
module.exports=mongoose.model('curso',CursoSchema);