import express from 'express';
const userRoutes = express.Router();
import { signUp, signIn, verifyEmail } from './controller/user.controller.js'
import { validation } from '../../middleware/validation.js';
import { signInSchema, signUpSchema } from './user.validator.js';

//NOTE - signUp
userRoutes.post("/signUp",
    validation(signUpSchema),
    signUp);

//NOTE - signIn
userRoutes.post("/signIn",
    validation(signInSchema),
    signIn);
    
//NOTE - verifyEmail
userRoutes.get("/verify/:token",
    verifyEmail);

export default userRoutes; 