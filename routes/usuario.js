//rutas para usuario
const express= require('express');
const router= express.Router();
const usuarioController= require('../controllers/usuarioController');

//api/usuarios
//router.post('/', usuarioController.crearUsuario);
//router.get('/cursoInfo',usuarioController.infoCursos);
const {isDBA,verifyToken} = require("../middleware/auth");
router.post('/login',usuarioController.login);
router.post('/', usuarioController.signUp);
router.get('/',[verifyToken,isDBA],usuarioController.obtenerUsuarios);
router.put('/:id',usuarioController.modificarUsuario);
router.get('/:id',usuarioController.obtenerUsuario);
router.delete('/:id',[verifyToken,isDBA],usuarioController.eliminarUsuario);

module.exports = router;