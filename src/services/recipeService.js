const { db } = require('../database');
const { formatRecipeMaterials } = require('../helpers/formatResponse');

const getAllRecipes = async () => {
    const query = 'SELECT id, name, category, image, alt_image AS altImage FROM recipe ORDER BY id ASC';
    const { rows } = await db.query(query);
    return rows;
};

const getRecipeById = async recipeId => {
    const text = 'SELECT id, name, category, image, alt_image AS altImage FROM recipe WHERE id = $1 ORDER BY id ASC';
    const values = [recipeId];
    const query = { text, values };
    const { rows } = await db.query(query);
    if (!rows[0]) throw new Error('Recipe not found');
    return rows[0];
};

const getRecipeMaterials = async () => {
    const query = `SELECT r.name AS recipe_name, r.image AS recipe_image, r.alt_image AS recipe_alt_image, r.category, m.name AS material_name, m.image AS material_image, m.alt_image AS material_alt_image, rm.amount
    FROM recipe r
    JOIN recipe_material rm on (r.id = rm.recipe_id)
    JOIN material m on (m.id = rm.material_id);`;
    const result = await db.query(query);
    return formatRecipeMaterials(result.rows);
};

const getAvailableRecipes = async materialList => {
    const recipeMaterials = await getRecipeMaterials();
    const availableRecipes = [];

    for (const recipe of recipeMaterials) {
        for (const [index, recipeMaterial] of recipe.materials.entries()) {
            const foundMaterial = materialList.find(
                m => m.name.toLowerCase() === recipeMaterial.name.toLowerCase()
            );
            if (!foundMaterial || (foundMaterial && foundMaterial.amount < recipeMaterial.amount))
                break;
            if (index === recipe.materials.length - 1) {
                availableRecipes.push(recipe);
            }
        }
    }

    return availableRecipes;
};

module.exports = { getAllRecipes, getRecipeById, getRecipeMaterials, getAvailableRecipes };
