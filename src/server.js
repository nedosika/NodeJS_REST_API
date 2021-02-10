import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import users from "./routes/users.js";
import storages from "./routes/storages.js";
import auth from "./routes/auth.js";

import {port, url} from "./config.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/storages", storages);

mongoose.connect(
    url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server ready connections on ${port}`);
        });
    })
    .catch(err => {
        console.log(err);
        process.exit();
    });
