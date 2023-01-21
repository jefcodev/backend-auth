const {Router} = require('express');
const { body } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router =  Router();
/* Path: '/api/login' */

router.post('/',
[
    body('email','el email es obligatorio').isEmail(),
    body('password', 'el password es obligatorio').not().isEmpty(),
    validarCampos
], login
);



module.exports = router;