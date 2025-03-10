import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().email().required(),
    rank: Joi.string().required(),
    rating: Joi.number().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(1).required(),
})