const router = require('express').Router();
const { getAllRecipes, getAllMaterials, getRecipeMaterials, getAvailableRecipes } = require('../services/recipeService');

router.get('/recipes', getAllRecipes);
router.get('/materials', getAllMaterials);
router.get('/recipe-materials', getRecipeMaterials);
router.post('/available-recipes', getAvailableRecipes);

module.exports = router;
