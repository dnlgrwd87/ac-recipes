const { db } = require('../database');

const getAllMaterials = async () => {
    const query = 'SELECT * FROM material ORDER BY id ASC';
    const { rows } = await db.query(query);
    return rows;
};

const getMaterialById = async materialId => {
    const text = 'SELECT * FROM material WHERE id = $1 ORDER BY id ASC';
    const values = [materialId];
    const query = { text, values };
    const { rows } = await db.query(query);
    if (!rows[0]) throw new Error('Material not found');
    return rows[0];
};

module.exports = { getAllMaterials, getMaterialById };
