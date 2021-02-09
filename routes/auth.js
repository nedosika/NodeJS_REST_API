import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

const accessTokenSecret = 'someaccesstokennBbgcd012984';
const refreshTokenSecret = 'somestringforrefreshtokennBbgcd012984';

router.post('/login', (req, res) => {
    // read username and password from request body
    const { username, password, id } = req.body;

    User.findOne({_id: id}, function(err, user){
        if(err)
            return console.log(err);
			
		// filter user from the users array by username and password
        const findedUser = users.find(u => { return u.username === username && u.password === password });
        if (findedUser) {
        // generate an access token
			const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
			const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

			refreshTokens.push(refreshToken);

			res.json({
				accessToken,
				refreshToken
			});
		} else {
			res.send('Username or password incorrect');
		}
    });
});

router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);

    res.send("Logout successful");
});

export default router;