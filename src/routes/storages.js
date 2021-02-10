import express from "express";
import Storage from "../models/storage.js";

const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get("/", (req, res) => {
    Storage.find({}, (err, storages) => {
        if(err) 
		    return console.log(err);
        res.send(storages)
    });
});


router.get("/:id", (req, res) => {
    const id = req.params.id;
    Storage.findOne({_id: id}, (err, storage) => {
        if(err)
            return console.log(err);
        res.send(storage);
    });
});

router.post("/", (req, res) => {
    if(!req.body)
        return res.sendStatus(400);
    const name = req.body.name;
    const capacity = req.body.capacity;
	const userId = req.body.userId;
    const storage = new Storage({name, capacity, userId});
    storage.save((err) => {
        if(err)
            return console.log(err);
        res.send(storage);
    });
});

router.put("/", (req, res) => {
    if(!req.body)
        return res.sendStatus(400);
    const id = req.body.id;
    const name = req.body.name;
    const capacity = req.body.capacity;
	const userId = req.body.userId;
    const newStorage = {name, capacity, userId};
	
    Storage.findOneAndUpdate(
        {_id: id},
        newStorage,
        {new: true},
        (err, storage) => {
            if(err)
               return console.log(err);
            res.send(storage);
        }
    );
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Storage.findByIdAndDelete(id, (err, storage) => {
        if(err)
            return console.log(err);
        res.send(storage);
    });
});

export default router;