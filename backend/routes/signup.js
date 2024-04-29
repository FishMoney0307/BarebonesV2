import express from "express";

import ldb from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

/*
    No need to get a list, that would probably be a crazy security issue lol
*/

