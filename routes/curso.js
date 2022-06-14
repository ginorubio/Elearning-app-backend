//rutas para producto
const express= require('express');
const router= express.Router();
const cursoController= require('../controllers/cursoController');

//api/cursos
router.get('/topCategoria',cursoController.agreggation);
router.get('/free',cursoController.obtenerGratuitos);
router.get('/top',cursoController.topValoracion);
router.post('/', cursoController.crearCurso);
router.post('/search', cursoController.buscarCurso);
router.get('/',cursoController.obtenerCursos);
router.put('/:id',cursoController.modificarCurso);
router.get('/:id',cursoController.obtenerCurso);
router.delete('/:id',cursoController.eliminarCurso);

module.exports = router;
