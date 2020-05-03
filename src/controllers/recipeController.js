const recipeService = require('../services/recipeService');
const { validateRequestBody } = require('../helpers/validation');

const getAll = async (req, res) => {
    try {
        let recipes;
        if (req.query && req.query.materials === 'true') {
            recipes = await recipeService.getRecipeMaterials();
        } else {
            recipes = await recipeService.getAllRecipes();
        }
        res.json(recipes);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

const getOne = async (req, res) => {
    try {
        const recipe = await recipeService.getRecipeById(req.params.id);
        res.json(recipe);
    } catch (error) {
        res.status(404).json({ error: error.message || error });
    }
};

const getAvailableRecipes = async (req, res) => {
    try {
        const materialList = req.body;
        if (!validateRequestBody(materialList)) {
            return res.status(400).json({ message: 'Please enter a valid payload' });
        }

        const availableRecipes = await recipeService.getAvailableRecipes(materialList);
        res.json(availableRecipes);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

module.exports = { getAll, getOne, getAvailableRecipes };
