
import jwt from 'jsonwebtoken';

import express from 'express';
import { loginSchema } from '../schemas/userSchema.js';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const route = express.Router();

function createJWT(inputObj) {
    const token = jwt.sign(inputObj, process.env.JWT_TOKEN_KEY);

    return token;
}

route.post('/', async (req, res) => {
    try {
        const { email, password: inputPassword } = req.body;
        console.log("name, rank, rating, email, password", email, inputPassword);

        const result = loginSchema.validate(req.body);
        if (result.error) {
            res.status(400).json({ error: result.error.details[0].message });
            return;
        }
        const doc = await User.findOne({ email: email });

        if(doc == null) {
            res.status(404).json({message : "Email id is not registered!"});
        } else {
            console.log(doc._doc);
            console.log("create JWT and end to Client");//To do - Decrypt db password, match with user password.
            
            const { name, rank, rating, email, password, access } = doc._doc;
            if(password != inputPassword) {
                res.status(401).json({message : "Unauthorized!"});
            } else {
                const token = createJWT({ name, rank, rating, email, access});
                const options = {
                    httpOnly: true,
                    // secure: true,  // Only works on HTTPS
                    maxAge: 1000 * 10 * 60 * 10, // 10-mins
                    // sameSite: 'Strict'
                }
                res.status(200).cookie('jwt_token', token, options).json({ message: "Login successfull with", name, rank, rating, access });
            }
            
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error Loggin in' });
    }
});

export const loginRoute = route;