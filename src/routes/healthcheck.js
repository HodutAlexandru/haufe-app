const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.status(200).json(healthcheck)
    } catch (e) {
        healthcheck.message = e;
        res.status(503).json(healthcheck);
    }
});

module.exports = router;