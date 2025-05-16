const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('🚀 API del Recetario funcionando');
});

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ MongoDB conectado');
        app.listen(process.env.PORT, () => {
            console.log(`🔥 Servidor corriendo en puerto ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error conectando a MongoDB', err);
    });
