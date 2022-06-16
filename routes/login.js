//rutas para login
const express= require('express');
const router= express.Router();
const loginController= require('../controllers/loginController');

//api/login
router.post('/', loginController.loginUsuario);

module.exports = router;
