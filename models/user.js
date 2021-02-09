import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userScheme = new Schema({
    login: String,
    password: String,
    name: String,
    role: String,
}, {versionKey: false});

const User = mongoose.model("User", userScheme);

export default User;