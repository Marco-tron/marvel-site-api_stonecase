const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
    res.status(200).json({
        message: "Favourites get requests"
    });
});

router.post("/", (req,res,next) => {
    res.status(200).json({
        message: "Favourites post requests"
    });
});

module.exports = router;