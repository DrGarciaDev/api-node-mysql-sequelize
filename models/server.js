const express = require('express');
const cors = require('cors');
const { sequelizeDbConnection } = require('../database/config-sequelize');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.customersSequelizeRoute = '/api/sequelize/customers';

        // CONEXION A LA BASE DE DATOS 
        this.conectarDB();

        // MIDDLEWARES 
        this.middlewares();

        // ROUTES 
        this.routes();
    }

    async conectarDB() {
        await sequelizeDbConnection;
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // LECTURA Y PARSEO DEL BODY
        // intenta que los datos que se reciban se serialicen a json 
        this.app.use(express.json());

        // DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.customersSequelizeRoute, require('../routes/customersSequelizeRoute'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', process.env.PORT);
        });
    }
}

module.exports = Server;