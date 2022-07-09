const express= require('express');
const router= express.Router();
const suscripcionController= require('../controllers/suscripcionController');
const {isUser, verifyToken} = require("../middleware/auth");

router.post('/suscribir',[verifyToken,isUser], suscripcionController.suscribir);

module.exports = router;