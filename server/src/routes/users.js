import express from 'express';
import { User } from '../models/user.model.js';
const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const doc = await User.find({});

        if (doc == null) {
            res.status(404).json({ users: [] });
        } else {
            res.status(200).json({
                users: doc.map(rec => {
                    const { name, rank, rating, email, createdDate, access } = rec._doc;
                    return { name, rank, rating, email, createdDate, access }
                })
            });
        }
    } catch (err) {
        res.status(500).json({ message: "An issue fetching users!" });
    }
})

export const usersRoute = route;