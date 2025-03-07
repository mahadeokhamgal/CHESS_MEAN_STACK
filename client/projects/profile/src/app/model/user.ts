import { Rank } from "./rank";

export interface User {
    name: string,
    rating: number,
    rank: Rank,
    registerDate: Date,
    email: string,
}