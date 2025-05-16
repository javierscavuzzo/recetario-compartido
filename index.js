// index.js

const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./database');
const recipeRoutes = require('./src/routes/recipeRoutes');

// Conectar a la base de datos
connectDB();

// Middleware para recibir JSON
app.use(express.json());

// Rutas
app.use('/api', userRoutes);
app.use('/api/recipes', recipeRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
