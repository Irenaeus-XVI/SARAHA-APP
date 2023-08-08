import express from 'express';
const userRoutes = express.Router();
import { signUp, signIn, verifyEmail } from './controller/user.controller.js'


//NOTE - signUp
userRoutes.post("/signUp", signUp);
//NOTE - signIn
userRoutes.post("/signIn", signIn);
//NOTE - verifyEmail
userRoutes.get("/verify/:token", verifyEmail);

export default userRoutes; 