var router = require('express').Router();

router.use('/api/menu', require('./menu'));
router.use('/api/menuType', require('./menuType'));
router.use('/api/ingredients', require('./ingredients'));

module.exports = router;