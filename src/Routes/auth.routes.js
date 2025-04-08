const { Router } = require('express');
const { LoginUsuario, RenweToken } = require('../Controller/LoginController');

const router = Router();

    router.post('/auth/login', LoginUsuario);


module.exports = router;