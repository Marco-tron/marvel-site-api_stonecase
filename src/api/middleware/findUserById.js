
const User = require('../models/User');

module.exports =  (req, res, next) => {
    return new Promise((resolve, reject) => {
        try{
            const user = User.findByPk(req.userData.userId);
            resolve(user);
        } catch (e) {
            reject(e)
        }
    })
};