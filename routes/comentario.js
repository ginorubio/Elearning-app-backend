const express= require('express');
const router= express.Router();
const comentarioController= require('../controllers/comentarioController');
const {isUser, verifyToken} = require("../middleware/auth");

router.post('/comentar',[verifyToken,isUser], comentarioController.comentar);

module.exports = router;