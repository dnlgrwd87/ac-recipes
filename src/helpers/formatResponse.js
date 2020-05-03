const formatRecipeMaterials = recipeMaterials => {
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
            altImage: rm.material_alt_image
        });
    }
    return Object.values(recipeMaterialsMap);
};

module.exports = { formatRecipeMaterials };
