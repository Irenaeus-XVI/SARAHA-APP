
import Joi from 'joi';
export const signUpSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'online'] } }),//NOTE - TOP LEVEL DOMAIN OPTION,
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

export const signInSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'online'] } }),//NOTE - TOP LEVEL DOMAIN OPTION,
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})
