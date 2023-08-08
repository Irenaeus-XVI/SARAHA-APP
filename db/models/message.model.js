import mongoose, { Schema, model } from "mongoose";


const messageSchema = new Schema({
    messageText: {
        type: String,
        minLength: [3, "MessageText Is Too Short"],
        required: true
    },
    receivedId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
    { timestamps: true }

)

export const messageModel = model("Message", messageSchema);


