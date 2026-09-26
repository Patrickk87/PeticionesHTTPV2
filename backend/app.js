var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); //

var routeClientes = require('./routes/routeClientes'); //[cite: 3]
var routeProductos = require('./routes/routeProductos');
var routeVentas = require('./routes/routeVentas');

var app = express();

app.use(cors()); // Habilitar peticiones desde React[cite: 3]
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/clientes', routeClientes);
app.use('/productos', routeProductos);
app.use('/ventas', routeVentas);

module.exports = app;