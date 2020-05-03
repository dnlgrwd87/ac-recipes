const validateRequestBody = body => {
    if (Object.keys(body).length === 0) return false;
    if (body.length === 0) return false;
    for (const materialCount of body) {
        if (Object.keys(materialCount).some(key => key !== 'name' && key !== 'amount')) {
            return false;
        }
        if (typeof materialCount.name !== 'string' || typeof materialCount.amount !== 'number')
            return false;
    }
    return true;
};

module.exports = { validateRequestBody };
