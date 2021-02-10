import jwt from "jsonwebtoken";

import {accessTokenSecret} from "../config.js";
import User from "../models/user.js";

const signUp = (req, res) => {
    if (!req.body.login || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter login and password.'
        });
    } else {
        let newUser = new User({
            login: req.body.login,
            password: req.body.password,
            name: req.body.name,
            role: "quest"
        });

        // Attempt to save the user
        newUser
            .save()
            .then(() => {
                    res.json({
                        success: true,
                        message: 'Successfully created new user.'
                    });
                }
            )
            .catch(() => {
                res.json({
                        success: false,
                        message: 'That login address already exists.'
                    });
                });

    }
};

const signIn = (req, res) => {
    // read username and password from request body
    const {login, password} = req.body;
    console.log(req.body);

    User.find({})
        .then(users => {
                // filter user from the users array by username and password
                const findedUser = users.find(u => {
                    return u.login === login && u.password === password
                });

                if (findedUser) {
                    // generate an access token
                    const accessToken = jwt.sign({
                        login: findedUser.login,
                        role: findedUser.role
                    }, accessTokenSecret, {expiresIn: '20m'});

                    res.json({
                        accessToken,
                    });
                } else {
                    res.send('Username or password incorrect');
                }
            }
        )
        .catch(err => {
            return console.log(err);
        })
};

const controller = {
    signIn, signUp
};

export default controller;
