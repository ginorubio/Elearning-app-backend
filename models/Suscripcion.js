const mongoose =require('mongoose');
const SuscripcionSchema= mongoose.Schema({
 emailUser:{
    type:String,
    required: true
 },
 nombreCurso:{
    type:String,
    required: true
 },
 fechaSuscripcion:{
   type:Date,
   required: true
}
});
module.exports=mongoose.model('suscripcion',SuscripcionSchema);