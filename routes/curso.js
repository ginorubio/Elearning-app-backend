//rutas para producto
const express= require('express');
const router= express.Router();
const cursoController= require('../controllers/cursoController');
const { isDBA, isUser, verifyToken} = require("../middleware/auth");
//api/cursos


router.get('/topCategoria',cursoController.agreggation);
router.get('/free',cursoController.obtenerGratuitos);
router.get('/top',cursoController.topValoracion);
router.post('/',[verifyToken,isDBA], cursoController.crearCurso);
router.post('/search',cursoController.buscarCurso);
router.get('/',[verifyToken,isUser],cursoController.obtenerCursos);
router.put('/:id',[verifyToken,isDBA],cursoController.modificarCurso);
router.get('/:id',[verifyToken,isDBA],cursoController.obtenerCurso);
router.delete('/:id',[verifyToken,isDBA],cursoController.eliminarCurso);

module.exports = router;
