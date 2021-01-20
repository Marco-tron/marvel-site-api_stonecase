const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/User');

const findUserById = require('../middleware/findUserById');

function PasswordCheck(password) {
    if(password !== String) {
        return password = password.toString();
    } else{
        return password;
    }
}
function noInput(tratative, text) {
    if(tratative) {
        return res.status(412).json({
            message: text
        });
    }
}

exports.createUser = (req, res, next) => {
    // sees if the necessary árams in req.body exists
    if (!req.body.email || !req.body.password){
        return res.status(412).json({
            error:{
                message: "Mail or password invalid"
            }
        });
    }
    //tries to find a user with email trying to create
    User.findAll({where: { email: req.body.email }})
    .then(user => { 
        // if there is one already it does not let you create an account
        if (user.length > 0) {
            console.log(user)
            return res.status(409).json({
                message: "Mail exists"
            });
        // if it cant find a user it then continues the logic
        } else {
            // if password isn a string it turns into one
            req.body.password = PasswordCheck(req.body.password);

            // encripting password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                // if hashing fails throw error
                if (err) {
                    return res.status(500).json({
                    error: err
                    });
                // if hashing succeds create a new user
                } else {
                    User.create({
                        email: req.body.email,
                        password: hash
                    })
                    // success message
                    .then(result => {
                        res.status(201).json({
                        message: "User created"
                        });
                    })
                    //error message if cant create
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                        error: err
                        });
                    });
                }
            });
        }
    })
}


exports.loginUser = (req, res, next) => {

    // the correct thing would be to use findOne but for some reason when this query cant find anything it timeouts so i'm using finAll here
    User.findAll({where: { email: req.body.email }})
    .then(user => {
        // if there was no email found authentication fails
        console.log(user);
        if (user.length < 1) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        // if it finds then it continues authentication

        // if password isn a string it turns into one
        req.body.password = PasswordCheck(req.body.password);

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            // if password is wrong auth fails
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            // if its not then we create a token
            if (result) {
                // creating token
                console.log(user[0].name,"aqui")
                const token = jwt.sign(
                    {
                        name: user[0].dataValues.name,
                        email: user[0].dataValues.email,
                        userId: user[0].dataValues.id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                // if sucesfull it sends back the token
                return res.status(200).json({
                    message: "Auth successful",
                    token: token,
                    user: {
                        name: user[0].dataValues.name,
                        email: user[0].dataValues.email
                    }
                });
            }
            // if not it fails authentication
            res.status(401).json({
                message: "Auth failed"
            });
        });
    })
    // if something fails in the proccess an error is thrown
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.attData = (req, res, next) => {
    noInput(!req.body.name && !req.body.email, "no input found");
    //finding the right user
    findUserById(req, res, next)
        .then( async user => {
            //updating the fields only if they are on the body
            if(req.body.name) {
                user.name = req.body.name
            }
            if(req.body.email) {
                user.email = req.body.email
            }
            // saving new fields
            await user.save();
            return res.status(200).json({
                message: "Update successful",
                userUpdate: {
                    name: user.name,
                    email: user.email,
                    id: user.id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.attPassword = (req, res, next) => {
    noInput(!req.body.oldPassword || !req.body.password, "both old and new passwords are required");
    //finding the right user
    findUserById(req, res, next)
        .then( async user => {
            //comparing old passwords
            bcrypt.compare(req.body.oldPassword, user.password, async (err, result) => {
                // if there is an error you cant update it
                
                if (err) {
                    return res.status(401).json({
                        message: "Old password is incorrect"
                    });
                }
                // if its not then we update it
                if (result) {
                    // saving new password
                    bcrypt.hash(req.body.password, 10,async (err, hash) => {
                        // if hashing fails throw error
                        if (err) {
                            return res.status(500).json({
                            error: err
                            });
                        // if hashing succeds it updates the password
                        } else {
                            console.log("oi");
                            user.password = hash
                            await user.save();
                            console.log(user);
                    
                            // if succesfull sends a success message
                            return res.status(200).json({
                                message: "Password changed successfuly",
                            });
                        }
                    })
                    // if the old password is wrong it returns an error
                } else {
                    return res.status(401).json({
                        message: "Old password is incorrect"
                    });
                }
                
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

