var express = require('express');
var router = express.Router();

// Base de datos simulada en memoria
let usuarios = [
  { id: 1, nombre: 'Santiago', email: 'santiago@example.com' },
  { id: 2, nombre: 'Carlos', email: 'carlos@example.com' }
];

// 1. GET - Obtener todos los usuarios
// Endpoint: GET http://localhost:3000/usuarios
router.get('/', function(req, res, next) {
  res.status(200).json({
    ok: true,
    mensaje: 'Lista de usuarios obtenida exitosamente',
    total: usuarios.length,
    data: usuarios
  });
});

// 2. GET - Obtener un usuario por ID
// Endpoint: GET http://localhost:3000/usuarios/1
router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontró el usuario con ID ${id}`
    });
  }

  res.status(200).json({
    ok: true,
    mensaje: 'Usuario encontrado',
    data: usuario
  });
});

// 3. POST - Crear un nuevo usuario
// Endpoint: POST http://localhost:3000/usuarios
// Body (JSON): { "nombre": "Laura", "email": "laura@example.com" }
router.post('/', function(req, res, next) {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El nombre y el email son obligatorios'
    });
  }

  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    email
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    ok: true,
    mensaje: 'Usuario creado exitosamente',
    data: nuevoUsuario
  });
});

// 4. PUT - Actualizar un usuario existente
// Endpoint: PUT http://localhost:3000/usuarios/1
// Body (JSON): { "nombre": "Santiago Actualizado", "email": "santi.nuevo@example.com" }
router.put('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const { nombre, email } = req.body;

  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontró el usuario con ID ${id} para actualizar`
    });
  }

  if (nombre) usuario.nombre = nombre;
  if (email) usuario.email = email;

  res.status(200).json({
    ok: true,
    mensaje: 'Usuario actualizado exitosamente',
    data: usuario
  });
});

// 5. DELETE - Eliminar un usuario por ID
// Endpoint: DELETE http://localhost:3000/usuarios/1
router.delete('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `No se encontró el usuario con ID ${id} para eliminar`
    });
  }

  const usuarioEliminado = usuarios.splice(index, 1);

  res.status(200).json({
    ok: true,
    mensaje: 'Usuario eliminado exitosamente',
    data: usuarioEliminado[0]
  });
});

module.exports = router;