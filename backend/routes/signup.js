import express from "express";

import ldb from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

/*
    No need to get a list, that would probably be a crazy security issue lol
*/

// Single record by id
router.get("/:id", async (req, res) => {
    let collection = await ldb.collection("loginCollection");
    let query = {_id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

//Create a new record
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            username: req.body.username,
            password: req.body.password,
        };
        let collection = await ldb.collection("loginCollection");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

//Update password/username
//Not required I think but I'll add functionality if need be
router.patch("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                username: req.body.username,
                password: req.body.password,
            },
        };

        let collection = await ldb.collection("backlogCollection");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("error updating record");
    }
});

//delete a record
//useless, why would a user ever delete a login to my perfect website?
router.delete("/:id", async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };

        const collection = ldb.collection("loginCollection");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;