import { userModel } from '../../../../db/models/user.model.js'
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { sendEmail } from "../../../email/sendemail.js";
import { handleAsyncError } from '../../../middleware/handleAsyncError.js';

export const signUp = handleAsyncError(async (req, res) => {


    try {
        let { name, email, password } = req.body;
        let existUser = await userModel.findOne({ email });

        if (existUser) {
            return res.json({ message: "email already exist " });
        }



        let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
        let addedUser = await userModel.insertMany({ name, email, password: hashedPassword });

        //NOTE - Verify User Email
        let verifiedToken = Jwt.sign({ id: addedUser[0]._id }, process.env.VERIFY_SECRET);
        sendEmail({
            email, api: `http://localhost:3000/api/v1/user/verify/${verifiedToken}`
        });


        res.status(200).json({ "Message": "User Added Successfully.", addedUser });


    } catch (error) {
        res.status(500).json({ "Error": error });
    }

});




export const signIn = handleAsyncError(async (req, res) => {
    try {
        let { email, password } = req.body;
        let existUser = await userModel.findOne({ email });

        //NOTE - Check User Verified Email 
        let verified = existUser.verified;
        if (verified) {
            if (existUser) {
                let matched = bcrypt.compareSync(password, existUser.password);
                if (matched) {
                    let token = Jwt.sign({ id: existUser._id }, process.env.SECRET_KEY);
                    res.status(200).json({ Message: "Welcome.", token });
                } else {
                    res.status(400).json({ Message: "Password Is Wrong." });
                }
            }
            else {
                res.status(404).json({ Message: "User Not Found You Have To Register First." });
            }
        } else {
            res.status(400).json({ Message: "You Have To Verify Your mail First" });
        }

    } catch (error) {
        res.status(500).json({ "Error": error });
    }

});




export const verifyEmail = handleAsyncError(async (req, res) => {

    let { token } = req.params;

    Jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
        if (err) return res.json({ Message: "Invalid Token", err });
        console.log(decoded);
        let user = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true });
        res.status(200).json({ Message: "User Verified Successfully.", user });
    })

});