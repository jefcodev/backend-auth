const { response } = require('express');

const Usuarios = require ('../models/usuario')

const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt.');

const login = async (req, res = response) => {
    // extraer el email y password 
    const { email, password } = req.body;

    try {
         // verificar email 
        const usuarioDB = await Usuarios.findOne({email});
       
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg: 'Email incorrecto'
            });
        };
        // verificar contraseña
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validarPassword){
            res.status(400).json({
                ok:false,
                msg:'contraseña incorrecta'
            });
        };

        // Generar JWT

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
}

module.exports = {
    login
};