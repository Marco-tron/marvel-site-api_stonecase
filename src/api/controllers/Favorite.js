
const Favorite = require('../models/Favorite');
const User = require('../models/User');

const findUserById = require('../middleware/findUserById');


exports.createFav = async (req, res, next) => {
    const user_id = req.userData.userId;
    const { marvelid, category, title, thumb }= req.body;

    // checks if all the params were received
    if (user_id && marvelid && category && title && thumb) {
        try{
            // checks if it is already favorited
            Favorite.findAll({where:{ marvelid: marvelid, category: category }})
                .then(favorites => {
                    // if it is throws error
                    if (favorites.length > 0) {
                        return res.status(409).json({
                            message: "Already favorited"
                        });
                        // if its not it creates the favorite
                    } else {
                        Favorite.create({
                            user_id,
                            marvelid,
                            category,
                            title,
                            thumb
                        }).then(fav => {
                            res.status(200).json({
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

exports.getAllFavs = async (req, res, next) => {
    //try getting favorites
    try {
        const user = await User.findByPk(req.userData.userId, {
            include: { association: 'Favorites' }
        });
        return res.status(200).json(user.Favorites);
    // if not possible return the error
    } catch (e) {
        return res.status(e.status).json({message: e.message});
    }
    
}

exports.deleteFav = async (req, res, next) => {
    //try getting favorites
    try {
        Favorite.findOne({where: { user_id: req.userData.userId, marvelid: req.params.marvelid, category: req.params.category }}).then(favorite => {
            favorite.destroy()
                .then(() => {
                    res.status(200).json({
                        message: "Favorite deleted"
                    });
                })
        })
    // if not possible return the error
    } catch (e) {
        return res.status(e.status).json({message: e.message});
    }
    
}