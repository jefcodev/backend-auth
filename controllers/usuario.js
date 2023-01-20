const { response } = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require("../models/usuario");

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, "nombre email google password");

    res.json({
        usuarios,
    });
};

const crearUsuario = async (req, res = response) => {
    const { password, email } = req.body;

    try {
        const existEmail = await Usuario.findOne({ email });
        if (existEmail) {
            return res.status(400).json({
                ok: "false",
                msg: "El correo ya esta en uso",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: "false",
            msg: "Error inesperado... revisar logs",
        });
    }

    const usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);



    // espera a que la promesa temine
    // guardar ususario
    await usuario.save();

    res.json({
        ok: true,
        usuario,
    });
};



const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id;


    try {
        // buscando el usuario por id
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }



        /*Actualización*/

        //Extraer datos del objetp
        const {password,google,email,...campos} = req.body;

        if (usuarioDB.email !== email) {
            const existEmail = await Usuario.findOne({ email });
            if (existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya existe....'
                })

            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            msg: usuarioActualizado
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error insesperado'

        })

    }

}


const deleteUsuario = async (req, res = response) =>{
    const uid = req.params.id;
    try {

        // buscando el usuario por id
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        
        
        res.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Error insesperdao revisar el log'
        });
        
    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    deleteUsuario
};
