const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require('../models/User');


    exports.createUser = (req, res, next) => {
        //tries to find a user with email trying to create
        console.log("bora encontrar")
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
                console.log("nao encontrou, entao continuamos")
                // if password isn a string it turns into one
                if(typeof req.body.password !== String) {
                    req.body.password = req.body.password.toString();
                }
                // encripting password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    // if hashing fails throw error
                    if (err) {
                        return res.status(500).json({
                        error: err
                        });
                    // if hashing succeds create a new user
                    } else {
                        console.log("hash", hash)
                        User.create({
                            email: req.body.email,
                            password: hash
                        })
                        // success message
                        .then(result => {
                            console.log("foii",result);
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

