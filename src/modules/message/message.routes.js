import express from 'express';
const messageRoutes = express.Router();
import { addMessage, getMessages } from './controller/message.controller.js'
import { auth } from '../../middleware/auth.js';
import { validation } from '../../middleware/validation.js';
import { messageSchema } from './message.validator.js';


//NOTE - addMessage
messageRoutes.post("/add", auth, validation(messageSchema), addMessage);
messageRoutes.get("/", auth, getMessages);

export default messageRoutes; 