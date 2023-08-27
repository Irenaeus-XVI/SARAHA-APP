import Joi from "joi";


export const messageSchema = Joi.object({
    messageText: Joi.string().min(3).required(),
    receivedId: Joi.string().hex().length(24).required()
}) 