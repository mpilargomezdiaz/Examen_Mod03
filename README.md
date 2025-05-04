# Examen_Mod03
MongoDB + Docker + Postman: API REST para gestión de productos

## Enunciado

- A partir de la siguiente API: 

## Estructura

```
productos-api/
├── src/
│   ├── models/
│   │   └── Producto.js
│   ├── controllers/
│   │   └── productoController.js
│   ├── routes/
│   │   └── productoRoutes.js
│   └── server.js
└── package.json
```

## Ficheros

### Producto.js

```js
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


```

### productoController.js

```js
const Producto = require('../models/Producto');


exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor' });
  }
};


exports.obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'ID inválido' });
  }
};


exports.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
};

```


### productoRoutes.js

```js
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

```


### server.js

```js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productoRoutes = require('./routes/productoRoutes');

const app = express();


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/productosdb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));


app.use(cors());
app.use(express.json());


app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

```

### JSON para pruebas: 

```js
{
  "nombre": "Portátil",
  "precio": 1500,
  "descripcion": "Equipo gama media",
  "stock": 10
}'
```
- Crea, usando docker-compose un contenedor que permita hacerle peticiones a la API y obtén capturas del proceso en las que se pueda ver que funciona.
