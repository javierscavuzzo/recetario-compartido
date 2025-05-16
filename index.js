// index.js

const express = require('express');
const connectDB = require('./database');

const app = express();
const PORT = 3000;

// Conectar a la base de datos
connectDB();

// Middleware para recibir JSON
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('🚀 API Recetario funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
