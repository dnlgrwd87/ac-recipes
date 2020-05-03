const router = require('express').Router();
const {
    getAll,
    getOne,
    getAvailableRecipes
} = require('../controllers/recipeController');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/available', getAvailableRecipes);

module.exports = router;
