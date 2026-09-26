var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(usuarios);
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  const { name, email } = req.body;
  const nuevoUsuario = { id: usuarios.length + 1, name, email };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});


module.exports = router;
