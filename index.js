require('dotenv').config() 

const express = require('express')
const  cors = require('cors')

const {dbConnection} = require('./database/config');
const { router } = require('./routes/usuario');
const { json } = require('express');


// crear servidor express
const app = express();


// configuración cors
app.use(cors());

//Lectura y parse del body
app.use( express.json());


//conection DB
dbConnection();

//rutas
app.use('/api/usuarios/', require('./routes/usuario'));

app.listen(process.env.PORT , () => {
    console.log('Servidor '+process.env.PORT)
})
