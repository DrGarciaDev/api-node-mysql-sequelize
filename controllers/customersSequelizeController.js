const { request, response } = require('express');
const { Op } = require('sequelize');
const Customers = require('../models/Customers.js');

const getCustomers = async(Request = request, Response = response) => {
    // Con el Request.query de Express se pueden recibir los parámetros por get como el siguiente
    // localhost:8080/api/Customers?q=hola&nombre=Luis&apikey=1234
    // const { q, nombre } = Request.query;
    try {
        const respuesta = await Customers.findAll()
            .then(function(data) {
                const res = {
                    success: true,
                    message: 'Load success',
                    data: data
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            });

        Response.json({
            msg: 'GET Customers MySQL - desde controller',
            // q: q,
            // nombre: nombre,
            data: respuesta,
            // fields: fields
        });
        console.log("Consulta ejecutada con éxito");

    } catch (error) {
        console.log('Error controllerCustomers getUsers')
        console.log(error);
    }
}

const postCustomers = async(Request = request, Response = response) => {
    const body = Request.body;
    // const { id } = Request.body;
    try {
        const respuesta = await Customers.create(body
                // {
                //     name: 'Luis Garcia',
                //     email: 'luis@gmail.com',
                //     address: 'Av siempre viva',
                //     phone: '1234'
                // }
            )
            .then(function(data) {
                const res = {
                    success: true,
                    message: 'Created success',
                    data: data
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            });

        Response.json({
            msg: 'POST Customers - desde controller',
            // id: id,
            // body: body,
            created: respuesta,
        });
    } catch (error) {
        console.log('Error controllerCustomers post user')
        console.log(error);
    }
}

const putCustomers = async(Request = request, Response = response) => {
    const id_customer = Request.params.customer_id;
    const body = Request.body;
    try {
        // const id_customer = 4;

        const respuesta = await Customers.update(body
                // {
                //     name: 'Juan Cruz',
                //     email: 'juan@gmail.com',
                //     address: 'Av siempre viva',
                //     phone: '4321'
                // }
                , {
                    where: {
                        id: id_customer,
                    }
                })
            .then(function(data) {
                const res = {
                    success: true,
                    message: 'Updated success',
                    data: data
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            });

        Response.json({
            msg: 'PUT Customers - desde controller',
            // id: id,
            updated: respuesta
        });

    } catch (error) {
        console.log('Error controllerCustomers putCustomers')
        console.log(error);
    }
}

const getCustomer = async(Request = request, Response = response) => {
    try {
        const id_customer = Request.params.customer_id;
        const respuesta = await Customers.findAll({
                where: {
                    id: id_customer,
                    // name: {
                    //     [Op.like]: '%' + id_customer + '%',
                    // }
                    // id: [1, 2],
                }
            })
            .then(function(data) {
                const res = {
                    success: true,
                    message: 'Get user success',
                    data: data
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            });

        Response.json({
            msg: 'GET un Customer - desde controller',
            getUser: respuesta,
        });

    } catch (error) {
        console.log('Error controllerCustomers getUser')
        console.log(error);
    }
}

const patchCustomers = (Request = request, Response = response) => {
    Response.json({
        msg: 'PATCH Customers - desde controller'
    });
}

const deleteCustomers = async(Request = request, Response = response) => {
    try {
        const id_customer = Request.params.customer_id;
        const respuesta = await Customers.destroy({
                where: {
                    id: id_customer,
                    // name: {
                    //     [Op.like]: '%' + id_customer + '%',
                    // }
                    // id: [1, 2],
                }
            })
            .then(function(data) {
                const res = {
                    success: true,
                    message: 'Delete user success',
                    data: data
                }
                return res;
            })
            .catch(error => {
                const res = {
                    success: false,
                    error: error
                }
                return res;
            });

        Response.json({
            msg: 'DELETE Customer - desde controller',
            deletedUser: respuesta,
        });

    } catch (error) {
        console.log('Error controllerCustomers delete')
        console.log(error);
    }
}

module.exports = {
    getCustomers,
    postCustomers,
    putCustomers,
    getCustomer,
    patchCustomers,
    deleteCustomers,
}