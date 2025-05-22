const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../../backend/controllers/authController');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.post('/login', authController.loginUser);

module.exports = router;
