const router = require('express').Router();

router.all('*', (req, res) => {
    res.status(404).send({
        message: 'Route not found',
        method: req.method,
        endpoint: req.originalUrl,
        timestamp: new Date().toISOString(),
    });
});

module.exports = router;
