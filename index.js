// index.js

const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoutes');
const recipeRoutes = require('./src/routes/recipeRoutes');
const authRoutes = require('./backend/routes/authRoutes');
const connectDB = require('./database');
const cors = require('cors');

// Conectar a la base de datos
connectDB();

// Middleware para recibir JSON
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
