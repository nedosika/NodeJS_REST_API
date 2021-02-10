import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import authenticateJWT from "../utils/authenticateJWT.js";
import {accessTokenSecret} from "../config.js";
import controller from "../controllers/user.controller";

const router = express.Router();

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.post('/register', function (req, res) {
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
        newUser.save(function (err) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'That login address already exists.'
                });
            }
            res.json({
                success: true,
                message: 'Successfully created new user.'
            });
        });
    }
});

router.post('/login', (req, res) => {
    // read username and password from request body
    const {login, password} = req.body;
    console.log(req.body);

    User.find({}, function (err, users) {
        if (err)
            return console.log(err);

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
    });
});

router.get("/", authenticateJWT, controller.getAllUsers);
router.get("/:id", authenticateJWT, controller.getUser);

router.post("/", authenticateJWT, (req, res) => {
    if (!req.body)
        return res.sendStatus(400);
    const login = req.body.login;
    const password = req.body.password;
    const role = req.body.role;
    const name = req.body.name;
    const user = new User({
        login,
        password,
        name,
        role
    });
    user.save((err) => {
        if (err)
            return console.log(err);
        res.send(user);
    });
});

router.put("/", authenticateJWT, (req, res) => {
    if (!req.body)
        return res.sendStatus(400);
    const id = req.body.id;
    const login = req.body.login;
    const password = req.body.password;
    const role = req.body.role;
    const name = req.body.name;
    const newUser = {login, password, name, role};

    User.findOneAndUpdate(
        {_id: id},
        newUser,
        {new: true},
        (err, user) => {
            if (err)
                return console.log(err);
            res.send(user);
        }
    );
});

router.delete("/:id", authenticateJWT, (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
        if (err)
            return console.log(err);
        res.send(user);
    });
});

export default router;