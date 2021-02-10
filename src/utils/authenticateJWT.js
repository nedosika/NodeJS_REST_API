import jwt from "jsonwebtoken";
import {accessTokenSecret} from "../config.js";

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[0];
        console.log(token);
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export default authenticateJWT;