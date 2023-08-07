import mongoose from "mongoose";



export const connection = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/Saraha-App").
        then(() => console.log("Db Connected")).
        catch((err) => console.log(err));
}