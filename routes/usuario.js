const {Router} = require('express');
const {body} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')

const {getUsuarios, crearUsuario, actualizarUsuario, deleteUsuario} = require('../controllers/usuario')

// Ruta de usuarios /api/usuarios

const router = Router();


router.get('/', getUsuarios);
router.post('/',
[
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password','El password es obligatorio').not().isEmpty(),
    body('email', 'El correo es obligatorio').isEmail(),
    validarCampos
]
,crearUsuario);

router.put('/:id', 
    [
        body('nombre', 'El nombre es obligatorio').not().isEmpty(),
        body('email','El email es obligatorio').isEmail(),
        body('role', 'El role es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actualizarUsuario
);

router.delete('/:id', deleteUsuario)

module.exports = router;