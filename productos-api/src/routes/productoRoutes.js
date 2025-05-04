const express = require('express');
const router = express.Router();
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto
} = require('../controllers/productoController');

router.route('/')
  .post(crearProducto)
  .get(obtenerProductos);

router.route('/:id')
  .get(obtenerProducto)
  .put(actualizarProducto)
  .delete(eliminarProducto);

module.exports = router;
