//rutas para usuario
const express= require('express');
const router= express.Router();
const usuarioController= require('../controllers/usuarioController');

//api/usuarios
router.post('/', usuarioController.crearUsuario);
router.get('/',usuarioController.obtenerUsuarios);
router.put('/:id',usuarioController.modificarUsuario);
router.get('/:id',usuarioController.obtenerUsuario);
router.delete('/:id',usuarioController.eliminarUsuario);

module.exports = router;