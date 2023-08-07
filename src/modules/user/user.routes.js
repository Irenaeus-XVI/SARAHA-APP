import express from 'express';
const userRoutes = express.Router();
import { signUp } from './controller/user.controller.js'


//NOTE - signUp

userRoutes.post("/signUp", signUp)

export default userRoutes; 