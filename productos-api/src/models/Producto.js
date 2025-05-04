const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    maxlength: 100
  },
  precio: {
    type: Number,
    required: true,
    min: [0, 'El precio no puede ser negativo']
  },
  descripcion: {
    type: String,
    maxlength: 500
  },
  stock: {
    type: Number,
    default: 0
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Producto', ProductoSchema);

