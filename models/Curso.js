const mongoose =require('mongoose');
const CursoSchema= mongoose.Schema({
 nombre:{
    type:String,
    required: true
 },
 categoria:{
    type:String,
    required: true
 },
 valoracion:{
   type:Number,
   required: true
},
descripcion:{
   type:String,
   required: true
},
 topico:{
   type:String,
   required: true
},
duracion:{
   type:String,
   required: true
},
 enlace:{
    type:String,
    required: true
 },precio:{
    type:Number,
    required: true

 },
 fechaCreacion:{
    type:Date,
    default: Date.now()
 }
});
module.exports=mongoose.model('curso',CursoSchema);

