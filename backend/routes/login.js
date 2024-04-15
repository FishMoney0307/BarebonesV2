import express from "express";
import uuid from "uuid";
import users from "../Login/users.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json(users);
});

router.get("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else {
        //res.sendStatus(400);
        res.send("Not found").status(404);
    }
});

//  Create new user
router.post("/", (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    };

    if(!newUser.name || !newUser.email) {
        return res.sendStatus(400);
    }

    users.push(newUser);
    res.json(users);
})

//  Update existing user
router.put("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        const updateUser = req.body;
        users.forEach(iser => {
            if (user.id === parseInt(req.params.id)) {
                user.name = updateUser.name ? updateUser.name : user.name;
                user.email = updateUser.email ? updateUser.emal : user.email;
                res.json({ msg: "User updated", user });
            }
        });
    } else {
        res.sendStatus(400);
    }
});

//  Delete user
router.delete("/:id", (req, res) => {
    const found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        users = users.filter(user => user.id !== parseInt(req.params.id));
        res.json({ msg: "User deleted", users });
    } else {
        res.sendStatus(400);
    }
})

module.exports = router;