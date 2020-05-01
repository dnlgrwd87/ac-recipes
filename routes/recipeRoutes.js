const router = require('express').Router();

router.get('/', function (req, res) {
    res.json({ message: 'in recipe route' });
});

module.exports = router;
