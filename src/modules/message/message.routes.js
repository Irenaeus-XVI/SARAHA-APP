import express from 'express';
const messageRoutes = express.Router();
import { addMessage, getMessages } from './controller/message.controller.js'
import { auth } from '../../middleware/auth.js';


//NOTE - addMessage
messageRoutes.post("/addMessage", auth, addMessage);
messageRoutes.get("/getMessages", auth, getMessages);

export default messageRoutes; 