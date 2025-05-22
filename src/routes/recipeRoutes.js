const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, recipeController.createRecipe);
router.get('/', recipeController.getRecipes);

module.exports = router;
