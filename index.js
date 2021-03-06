const express= require('express');
const conectarDB= require('./config/db');
const crearRol = require('./lib/role');
//const { append } = require('express/lib/response');
// creando el servidor
const app = express();
//conectar el servidor
conectarDB();
crearRol();
app.use(express.json());
app.use('/api/curso', require('./routes/curso'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/comentario', require('./routes/comentario'));
app.use('/api/suscripcion', require('./routes/suscripcion'));
app.listen(4000,()=>{
 console.log('El servidor esta corriendo perfectamente')
})
