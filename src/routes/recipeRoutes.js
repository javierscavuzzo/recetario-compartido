const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
} = require('../controllers/recipeController');

// Crear receta (requiere login)
router.post('/', authMiddleware, createRecipe);

// Obtener todas las recetas
router.get('/', getAllRecipes);

// Obtener una receta por ID
router.get('/:id', getRecipeById);

// Actualizar receta (requiere login)
router.put('/:id', updateRecipe);

// Eliminar receta (requiere login)
router.delete('/:id', deleteRecipe);

module.exports = router;
