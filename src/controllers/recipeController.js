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
        res.status(500).json({ eror: error.message });
    }
};
