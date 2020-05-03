const { db } = require('../database');

const getAllMaterials = async () => {
    const query = 'SELECT id, name, image, alt_image FROM material ORDER BY id ASC';
    const { rows } = await db.query(query);
    return rows.map(row => {
        const { alt_image, ...material } = row;
        return { ...material, altImage: alt_image };
    });
};

const getMaterialById = async materialId => {
    const text = 'SELECT id, name, image, alt_image FROM material WHERE id = $1 ORDER BY id ASC';
    const values = [materialId];
    const query = { text, values };
    const { rows } = await db.query(query);
    if (!rows[0]) throw new Error('Material not found');
    const { alt_image, ...material } = rows[0];
    return { ...material, altImage: alt_image };
};

module.exports = { getAllMaterials, getMaterialById };
