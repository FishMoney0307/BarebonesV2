import express from "express";

import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

/*
    get list of all records if I need to display it
*/
router.get("/", async (req, res) => {
    let collection = await db.collection("contactCollection");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  });

/*
    Same with get record by id (maybe for validation)
    However I don't think I should check for id since
    people should be able to submit multiple emails
*/

//Create new record
router.post("/", async (req, res) => {
    try {
        let newDocument = {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            msg: req.body.msg,
        };
        let collection = await db.collection("contactCollection");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

/*
    No need to update submitted emails
    (cant do that normally anyway lmao)
*/

//Gonna make a delete function just in case
router.delete("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id) };

        const collection = db.collection("contactCollection");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting record");
    }
});

export default router;