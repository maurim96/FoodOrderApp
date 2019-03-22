var router = require('express').Router();

router.use('/api/garnish', require('./garnish'));
router.use('/api/ingredients', require('./ingredients'));
router.use('/api/menu', require('./menu'));
router.use('/api/location', require('./location'));
router.use('/api/order', require('./order'));
router.use('/api/turn', require('./turn'));
router.use('/api/user', require('./user'));

module.exports = router;