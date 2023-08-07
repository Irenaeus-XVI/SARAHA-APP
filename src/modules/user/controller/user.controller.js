import { userModel } from '../../../../db/models/user.model.js'
import bcrypt from 'bcrypt';

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