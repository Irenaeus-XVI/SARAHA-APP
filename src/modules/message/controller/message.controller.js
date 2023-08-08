import { messageModel } from "../../../../db/models/message.model.js";
import { userModel } from "../../../../db/models/user.model.js";
import jwt from 'jsonwebtoken';


export const addMessage = async (req, res) => {
    try {
        let { messageText, receivedId } = req.body;
        const existUser = await userModel.findById({ _id: receivedId });
        if (!existUser) {
            res.status(404).json({ Message: "User Not Found." });
        }
        let message = await messageModel.insertMany({ messageText, receivedId });
        res.status(200).json({ Message: "Message Added Successfully.", message });
    } catch (error) {
        res.status(400).json({ Error: error });

    }
}



export const getMessages = async (req, res) => {

    try {
        let allMessages = await messageModel.find({ receivedId: req.userId });
        res.status(200).json({ Messages: "Success.", allMessages });
    } catch (error) {
        res.status(400).json({ Error: error });

    }

}