import { userModel } from '../../../../db/models/user.model.js'
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
export const signUp = async (req, res) => {


    try {
        let { name, email, password } = req.body;
        let existUser = await userModel.findOne({ email });

        if (existUser) {
            return res.json({ message: "email already exist " });
        }

        let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
        let addedUser = await userModel.insertMany({ name, email, password: hashedPassword });
        res.status(200).json({ "Message": "User Added Successfully.", addedUser });


    } catch (error) {
        res.status(500).json({ "Error": error });
    }

}




export const signIn = async (req, res) => {
    try {
        let { email, password } = req.body;
        let existUser = await userModel.findOne({ email });

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
    } catch (error) {
        res.status(500).json({ "Error": error });
    }

} 