const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const auth = require('../middleware/auth');

// Crear receta (requiere login)
router.post('/', authMiddleware, createRecipe);

// Obtener todas las recetas
router.get('/', getAllRecipes);

// Obtener una receta por ID
router.get('/:id', getRecipeById);

// Actualizar receta (requiere login)
router.put('/:id', auth, recipeController.updateRecipe);

// Eliminar receta (requiere login)
router.delete('/:id', deleteRecipe);

module.exports = router;
