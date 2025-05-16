// database.js

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/miBaseDeDatos';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('📦 Conectado a MongoDB correctamente');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
