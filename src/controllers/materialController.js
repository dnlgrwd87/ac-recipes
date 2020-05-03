const materialService = require('../services/materialService');

const getAll = async (req, res) => {
    try {
        const materials = await materialService.getAllMaterials();
        res.json(materials);
    } catch (error) {
        res.status(400).json({ error: 'Something went wrong' });
    }
};

const getOne = async (req, res) => {
    try {
        const material = await materialService.getMaterialById(req.params.id);
        res.json(material);
    } catch (error) {
        res.status(404).json({ error: error.message || error });
    }
};

module.exports = { getAll, getOne };
