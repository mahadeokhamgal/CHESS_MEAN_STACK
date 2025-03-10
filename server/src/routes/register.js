import express from 'express';
import { userSchema } from '../schemas/userSchema.js';

import { User } from '../models/user.model.js';

const route = express.Router();

route.post('/', async (req, res) => {
  try {
    const { name, rank, rating, email, password } = req.body;
    console.log("name, rank, rating, email, password", name, rank, rating, email, password);

    const result = userSchema.validate(req.body);
    if (result.error) {
      res.status(400).json({ error: result.error.details[0].message });
      return;
    }

    const newUser = new User({ name, rank, rating, email, password });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
});

export const registerRoute = route;