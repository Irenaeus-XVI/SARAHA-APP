import { messageModel } from "../../../../db/models/message.model.js";
import { userModel } from "../../../../db/models/user.model.js";
import jwt from 'jsonwebtoken';
import { handleAsyncError } from "../../../middleware/handleAsyncError.js";
import { AppError } from "../../utils/appError.js";


export const addMessage = handleAsyncError(async (req, res,next ) => {

    let { messageText, receivedId } = req.body;
    const existUser = await userModel.findById({ _id: receivedId });
    if (!existUser) {
        return next(new AppError('User Not Found.', 404));
    }
    let message = await messageModel.create({ messageText, receivedId });
    existUser.messages.push(message._id);
    await existUser.save();
    res.status(200).json({ Message: "Message Added Successfully.", message });

});



export const getMessages = handleAsyncError(async (req, res) => {


    let allMessages = await userModel.findOne({ _id: req.userId }).select(" -_id messages").populate("messages");
    res.status(200).json({ Messages: "Success.", allMessages: allMessages.messages });


});