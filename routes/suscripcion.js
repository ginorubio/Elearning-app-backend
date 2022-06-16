const express= require('express');
const router= express.Router();
const suscripcionController= require('../controllers/suscripcionController');

router.post('/suscribir', suscripcionController.suscribir);

module.exports = router;