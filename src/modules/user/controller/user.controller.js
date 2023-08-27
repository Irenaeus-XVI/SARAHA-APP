import { userModel } from '../../../../db/models/user.model.js'
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { sendEmail } from "../../../email/sendemail.js";
import { handleAsyncError } from '../../../middleware/handleAsyncError.js';
import { AppError } from '../../utils/appError.js';




export const signUp = handleAsyncError(async (req, res, next) => {



    let { name, email, password } = req.body;
    let existUser = await userModel.findOne({ email });

    if (existUser) {
        return next(new AppError('email already exist', 409));
    }



    let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    let addedUser = await userModel.insertMany({ name, email, password: hashedPassword });

    //NOTE - Verify User Email
    let verifiedToken = Jwt.sign({ id: addedUser[0]._id }, process.env.VERIFY_SECRET);
    sendEmail({
        email, api: `http://localhost:3000/api/v1/user/verify/${verifiedToken}`
    });


    res.status(200).json({ "Message": "User Added Successfully.", addedUser });




});
export const signIn = handleAsyncError(async (req, res, next) => {

    let { email, password } = req.body;
    let existUser = await userModel.findOne({ email });

    //NOTE - Check User Verified Email 
    let verified = existUser.verified;
    if (verified) {
        if (existUser) {
            let matched = bcrypt.compareSync(password, existUser.password);
            if (matched) {
                let token = Jwt.sign({ id: existUser._id }, process.env.SECRETKEY);
                res.status(200).json({ Message: "Welcome.", token });
            } else {
                next(new AppError('Password Is Wrong.', 400));
            }
        }
        else {
            next(new AppError('User Not Found You Have To Register First.', 404));

        }
    } else {
        next(new AppError('You Have To Verify Your mail First.', 400));
    }



});




export const verifyEmail = handleAsyncError(async (req, res, next) => {

    let { token } = req.params;

    Jwt.verify(token, process.env.VERIFY_SECRET, async (err, decoded) => {
        if (err) return next(new AppError('Invalid Token.', 400));
        console.log(decoded);
        let user = await userModel.findByIdAndUpdate(decoded.id, { verified: true }, { new: true });
        res.status(200).json({ Message: "User Verified Successfully.", user });
    })

});