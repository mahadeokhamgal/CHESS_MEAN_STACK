import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();

export const connectMongo = () => {
    const mongourl = process.env.MONGO_URL;
    const mongodb = process.env.MONGO_DB;

    mongoose.connect(mongourl + mongodb, {})
    .then(() => {
        console.log("mongoDB connected successfully");
    })
    .catch(() => {
        console.log("error connecting mongoose");
    })
}