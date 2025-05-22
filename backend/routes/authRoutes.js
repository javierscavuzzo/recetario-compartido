const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/authController');

// Ruta para login (usa el controlador real)
router.post('/login', loginUser);

// Ruta de ejemplo para registro (si todavía no tenés un controlador real)
router.post('/register', (req, res) => {
    res.send('Registro OK');
});

module.exports = router;
