const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productoRoutes = require('./routes/productoRoutes');

const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/productosdb')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
