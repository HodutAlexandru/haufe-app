const express = require("express");

const router = express.Router();

router.get("", (req, res, next) => {
    res.status(200).json({
        message: "This is the info endpoint",
        info: "This is haufe test application"
    })
});

module.exports = router;