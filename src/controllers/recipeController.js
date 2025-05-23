const Recipe = require('../models/Recipe');

//Crear una nueva receta
exports.createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, createdBy } = req.body;

        const recipe = new Recipe({
            title,
            ingredients,
            instructions,
            createdBy,
        });
        await recipe.save();

        res.status(201).json(recipe);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Obtener todas las recetas

exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('createdBy', 'name email');
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una receta por ID
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la receta' });
    }
};

// Actualizar receta
const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la receta' });
    }
};

// Eliminar receta
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Receta no encontrada' });
        }
        res.status(200).json({ message: 'Receta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la receta' });
    }
};

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
};
