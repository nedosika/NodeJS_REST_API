import User from "../models/user.js";

const getUser = (req, res) => {
    const id = req.params.id;
    User.findOne({_id: id})
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            console.log(err);
        });
};

const getAllUsers = (req, res) => {
    User.find({})
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            console.log(err);
        });
};

const controller = {getUser, getAllUsers};

export default controller;