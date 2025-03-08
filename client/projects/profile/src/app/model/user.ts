import { Rank } from "./rank";

export interface User {
    name: String,
    rating: Number,
    rank: Rank,
    registerDate: Date,
    email: String,
}