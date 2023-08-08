import express from 'express';
const userRoutes = express.Router();
import { signUp, signIn } from './controller/user.controller.js'


//NOTE - signUp
userRoutes.post("/signUp", signUp);
//NOTE - signIn
userRoutes.post("/signIn", signIn);

export default userRoutes; 