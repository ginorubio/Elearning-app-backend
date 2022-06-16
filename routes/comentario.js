const express= require('express');
const router= express.Router();
const comentarioController= require('../controllers/comentarioController');

router.post('/comentar', comentarioController.comentar);

module.exports = router;