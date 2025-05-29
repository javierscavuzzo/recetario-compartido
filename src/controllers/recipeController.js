const Recipe = require('../models/Recipe');

// Crear una nueva receta
const createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, createdBy } = req.body;

        if (!title || !ingredients || !instructions || !createdBy) {
            return res
                .status(400)
                .json({ error: 'Todos los campos son obligatorios' });
        }

        const recipe = new Recipe({
            title,
            ingredients,
            instructions,
            createdBy,
        });
        await recipe.save();

        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({
            error: 'Error al crear la receta: ' + error.message,
        });
    }
};

// Obtener todas las recetas
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('createdBy', 'name email');
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una receta
const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
            new: true,
        });

        if (!updatedRecipe) {
            return res.status(404).json({ error: 'Receta no encontrada' });
        }

        res.json(updatedRecipe);
    } catch (err) {
        res.status(500).json({
            error: 'Error al actualizar receta: ' + err.message,
        });
    }
};

// Exportar todas las funciones
module.exports = {
    createRecipe,
    getRecipes,
    updateRecipe,
};
