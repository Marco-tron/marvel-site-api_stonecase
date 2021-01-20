const express = require("express");
const router = express.Router();

const UserController = require('../controllers/User');
const FavoriteController = require('../controllers/Favorite');

// calling athentication middleware
const Auth = require('../middleware/auth');
// SignUp route
router.post("/signup", UserController.createUser);
// Login route
router.post("/login", UserController.loginUser);

// needs auth updating data
router.put("/:user_id/att", (req,res,next) => {
    res.status(200).json({
        message: "updating user data"
    });
});
//needs auth updating password
router.put("/:user_id/newPassword", (req,res,next) => {
    res.status(200).json({
        message: "updating user password"
    });
});
// needs auth route for listing a users favorites
router.get("/:user_id/favorites", (req,res,next) => {
    res.status(200).json({
        message: "getting user favorites"
    });
});

// needs auth route for creating a favorite
router.post("/:user_id/favorites", (req,res,next) => {
    res.status(200).json({
        message: "creating user favorites"
    });
});

// needs auth route for creating a favorite
router.post("/:user_id/favorites/:marvelid", (req,res,next) => {
    res.status(200).json({
        message: "deleting a favorite"
    });
});



module.exports = router;