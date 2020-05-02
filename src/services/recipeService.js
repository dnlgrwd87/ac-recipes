const { db } = require('../database');

const getAllRecipes = async (req, res) => {
    const query = 'SELECT * FROM recipe ORDER BY id ASC';
    const result = await db.query(query);
    res.json(result.rows);
};

const getAllMaterials = async (req, res) => {
    const query = 'SELECT * FROM material ORDER BY id ASC';
    const result = await db.query(query);
    res.json(result.rows);
};

const getRecipeMaterials = async (req, res) => {
    res.json(await _getRecipeMaterials());
};

const getAvailableRecipes = async (req, res) => {
    const materialList = req.body;
    if (!_validateRequestBody(materialList)) {
        return res.status(400).json({ message: 'Please send a valid payload' });
    }
    const recipeMaterials = await _getRecipeMaterials();
    const availableRecipes = [];

    for (const recipe of recipeMaterials) {
        for (const [index, recipeMaterial] of recipe.materials.entries()) {
            const foundMaterial = materialList.find(m => m.name.toLowerCase() === recipeMaterial.name.toLowerCase());
            if (!foundMaterial || (foundMaterial && foundMaterial.amount < recipeMaterial.amount)) break;
            if (index === recipe.materials.length - 1) {
                availableRecipes.push(recipe);
            }
        }

    }
    res.json(availableRecipes);
};

const _getRecipeMaterials = async (req, res) => {
    const query = `SELECT r.name AS recipe_name, r.image AS recipe_image, r.alt_image AS recipe_alt_image, r.category, m.name AS material_name, m.image AS material_image, m.alt_image AS material_alt_image, rm.amount
                    FROM recipe r
                    JOIN recipe_material rm on (r.id = rm.recipe_id)
                    JOIN material m on (m.id = rm.material_id);`;
    const result = await db.query(query);
    return _formatRecipeMaterials(result.rows);
};

const _formatRecipeMaterials = recipeMaterials => {
    const recipeMaterialsMap = {};
    for (const rm of recipeMaterials) {
        if (!recipeMaterialsMap[rm.recipe_name]) {
            recipeMaterialsMap[rm.recipe_name] = {
                name: rm.recipe_name,
                image: rm.recipe_image,
                altImage: rm.recipe_alt_image,
                category: rm.category,
                materials: []
            };
        }
        recipeMaterialsMap[rm.recipe_name].materials.push({
            name: rm.material_name,
            amount: rm.amount,
            image: rm.material_image,
            alt_image: rm.material_alt_image
        });

    }
    return Object.values(recipeMaterialsMap);
};

const _validateRequestBody = body => {
    for (const materialCount of body) {
        if (Object.keys(materialCount).some(key => key !== 'name' && key !== 'amount')) {
            return false;
        }
        if (typeof materialCount.name !== 'string' || typeof materialCount.amount !== 'number') return false;
    }
    return true;

};

// module.exports.populateJoinTable = async (req, res) => {
//     for (const recipe of recipes) {
//         const dbRecipe = dbRecipes.find(r => r.name === recipe.name);
//         dbRecipe['materials'] = [];
//         recipe.materials.forEach(m => {
//             const dbMaterial = dbMaterials.find(dbM => dbM.name.toLowerCase() === m.name.toLowerCase());
//             dbRecipe.materials.push({ amount: m.amount, ...dbMaterial });
//         });
//
//         for (const recipeMaterial of dbRecipe.materials) {
//             const text = 'INSERT INTO recipe_material(recipe_id, material_id, amount) VALUES($1, $2, $3)';
//             const values = [dbRecipe.id, recipeMaterial.id, recipeMaterial.amount];
//             await db.query({ text, values });
//         }
//     }
//     res.json('success');
// };

module.exports = { getAllRecipes, getAllMaterials, getRecipeMaterials, getAvailableRecipes };
