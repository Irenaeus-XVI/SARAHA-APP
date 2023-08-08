import { messageModel } from "../../../../db/models/message.model.js";
import { userModel } from "../../../../db/models/user.model.js";
import jwt from 'jsonwebtoken';
import { handleAsyncError } from "../../../middleware/handleAsyncError.js";


export const addMessage = handleAsyncError(async (req, res) => {
    try {
        let { messageText, receivedId } = req.body;
        const existUser = await userModel.findById({ _id: receivedId });
        if (!existUser) {
            res.status(404).json({ Message: "User Not Found." });
        }
        let message = await messageModel.create({ messageText, receivedId });
        existUser.messages.push(message._id);
        await existUser.save();
        res.status(200).json({ Message: "Message Added Successfully.", message });
    } catch (error) {
        res.status(400).json({ Error: error });

    }
});



export const getMessages = handleAsyncError(async (req, res) => {

    try {
        let allMessages = await userModel.findOne({ _id: req.userId }).select(" -_id messages").populate("messages");
        res.status(200).json({ Messages: "Success.", allMessages: allMessages.messages });
    } catch (error) {
        res.status(400).json({ Error: error });

    }

});