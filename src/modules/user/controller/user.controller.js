import { userModel } from '../../../../db/models/user.model.js'
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {


    let { name, email, password } = req.body;
    console.log({ name, email, password });
    // let existUser = await userModel.findOne({ email });

    // if (existUser) {
    //     return res.json({ message: "email already exist " });
    // }

    // let hashedPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS));
    // let addedUser = await userModel.insertMany({ name, email, password: hashedPassword });


} 