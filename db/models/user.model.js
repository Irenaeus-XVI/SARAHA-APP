import { Schema, model } from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        minLength: [3, "Name Is Too Short"],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: [4, "Password Is Too Short"],
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }

)

export const userModel = model("User", userSchema);


