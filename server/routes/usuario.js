const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto')

const app = express()

app.get('/usuario', function(req, res) {
    //agregamos parámetros para que nos liste el número de usuarios que deseamos
    let desde = req.query.desde || 5; //Si no ingresamos un número por defecto se va a listar desde el 5
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)
        //buscamos hasta el límite ingresado o por defecto
    Usuario.find({}, 'goole email role')
        .limit(limite) //termina
        .skip(desde) //empieza
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //Lo que nos devuelve
            Usuario.count({}, (err, conteo) => {

                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios

                });
            });
        });
});



//Para enviar datos,
app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        //para incriptar la contraseña
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.post('/categoria', function(req, res) {
    let body = req.body;
    let categoria = new Categoria({
        nombre: body.nombre
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            Categoria: categoriaDB
        });
    });
});

app.post('/producto', function(req, res) {
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        disponible: body.disponible
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});


//Para actualizar datos.....
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id
        //capturar los datos del body
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;
    //Buscamos el id del usuario para borrarlo
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
})

module.exports = app;