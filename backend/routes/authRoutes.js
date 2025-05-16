const express = require('express');
const router = express.Router();

// Aquí definís tus endpoints, ejemplo:
router.post('/login', (req, res) => {
    // lógica de login
    res.send('Login OK');
});

router.post('/register', (req, res) => {
    // lógica de registro
    res.send('Registro OK');
});

module.exports = router;
