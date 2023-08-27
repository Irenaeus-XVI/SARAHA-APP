import mongoose from "mongoose";



export const connection = () => {
    mongoose.connect(process.env.CONNECTIONURL).
        then(() => console.log("Db Connected")).
        catch((err) => console.log(err));
}