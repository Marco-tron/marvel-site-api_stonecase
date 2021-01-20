
const Favorite = require('../models/Favorite');

const findUserById = require('../middleware/findUserById');


exports.createFav = async (req, res, next) => {
    const user_id = req.userData.userId;
    const { marvelid, category }= req.body;

    // checks if all the params were received
    console.log(user_id , req.body , category)
    if (user_id && marvelid && category) {
        try{
            // checks if it is already favorited
            Favorite.findAll({where:{ marvelid: marvelid }})
                .then(favorites => {
                    // if it is throws error
                    if (favorites.length > 0) {
                        console.log(favorites)
                        return res.status(409).json({
                            message: "Already favorited"
                        });
                        // if its not it creates the favorite
                    } else {
                        Favorite.create({
                            user_id,
                            marvelid,
                            category
                        }).then(fav => {
                            res.status(201).json({
                                message: "Favorite created"
                            });
                        });
                    }
                })
            
        } catch (e) {
            res.status(e.status).json({
                message: e.message
            });
        }
    } else {
    // if there is one param missing it throws an error message
        return res.status(412).json({
            message: "missing data to save"
        });
    }
}