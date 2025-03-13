import { Rank } from "../enums/rank";

export interface User {
    name: String,
    rating: Number,
    rank: Rank,
    registerDate: Date,
    email: String,
    password?: string
}