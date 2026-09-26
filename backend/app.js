const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// 1. HABILITAR PERMISOS DE CORS (Para que Vercel y localhost puedan conectarse)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// 2. PARSEAR CUERPO DE PETICIONES JSON (Para leer los datos de Agregar/Editar)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 3. RUTAS
const routeClientes = require('./routes/routeClientes');
const routeProductos = require('./routes/routeProductos');
const routeVentas = require('./routes/routeVentas');

app.use('/clientes', routeClientes);
app.use('/productos', routeProductos);
app.use('/ventas', routeVentas);

module.exports = app;