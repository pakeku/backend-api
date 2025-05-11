const router = require('express').Router();

router.get('/', (_, res) => {
    res.redirect('/health');
});

module.exports = router;