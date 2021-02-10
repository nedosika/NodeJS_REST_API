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

const addUser = (req, res) => {
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
}

const updateUser = (req, res) => {
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
};

const removeUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
        if (err)
            return console.log(err);
        res.send(user);
    });
}

const controller = {
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    removeUser
};

export default controller;