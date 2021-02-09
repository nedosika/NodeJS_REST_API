import mongoose from "mongoose";

const Schema = mongoose.Schema;
const storageScheme = new Schema({
    name: String,
    capacity: Number,
    userId: Number
}, {versionKey: false});

const Storage = mongoose.model("Storage", storageScheme);

export default Storage;