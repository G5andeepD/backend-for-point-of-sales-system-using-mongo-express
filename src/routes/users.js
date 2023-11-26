import express from "express";
import { User } from "../model/userModel.js";

export const router = express.Router();

//Routes for users
//GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); // Success: 200 OK
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//GET a specific user
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.status(200).json(user); // Success: 200 OK
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//POST a user
router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
    });

    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser); // Success: 201 Created
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//UPDATE a user
router.patch("/:userId", async (req, res) => {
    try {
        const updatedUser = await User.updateOne(
            { _id: req.params.userId },
            { $set: { name: req.body.name } }
        );
        if (updatedUser.n === 0) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.status(200).json(updatedUser); // Success: 200 OK
    } catch (err) {
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});

//DELETE a user
router.delete("/:userId", async (req, res) => {
    try {
        const removedUser = await User.deleteOne({ _id: req.params.userId });
        if (removedUser.deletedCount === 0) {
            res.status(404).json({ message: "No user found" });
            return;
        }
        res.status(202).json(removedUser); // Success: 202 Accepted
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err }); // Failure: 500 Internal Server Error
    }
});
