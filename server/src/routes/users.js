import express from 'express';
import { User } from '../models/user.model.js';
const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const { name, rank, rating, email, password } = req.body;

        const doc = await User.find({});

        if (doc == null) {
            res.status(404).json({ users: [] });
        } else {
            console.log(doc._doc);
            console.log("create JWT and end to Client");//To do - Decrypt db password, match with user password.

            res.status(200).json({ users: doc.map(rec => {
                const { name, rank, rating, email, createdDate } = rec._doc;
                return { name, rank, rating, email, createdDate }
            } ) });
        }
    } catch (err) {
        res.status(500).json({ message: "An issue fetching users!" });
    }
})

export const usersRoute = route;