const Sequelize = require('sequelize');

var sequelizeDbConnection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
        host: 'localhost',
        port: process.env.MYSQL_PORT,
        dialect: 'mysql' // mariadb, sqlite, postgres
    }
)

// Genera la migración del modelo a la base de datos:
sequelizeDbConnection.sync();

module.exports = sequelizeDbConnection;