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

// updating user data
router.put("/att", Auth, UserController.attData);
// updating password
router.put("/newPassword", Auth, UserController.attPassword );



// needs auth route for creating a favorite
router.post("/favorites", Auth, FavoriteController.createFav );
// needs auth route for listing a users favorites
router.get("/favorites", Auth, FavoriteController.getAllFavs );

// needs auth route for creating a favorite
router.delete("/favorites/:category/:marvelid", Auth, FavoriteController.deleteFav);



module.exports = router;