import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { connection } from './db/connection.js';
import userRoutes from './src/modules/user/user.routes.js';
import messageRoutes from './src/modules/message/message.routes.js';
const app = express()
app.use(express.json());
const port = 3000
connection();
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoutes);
app.use("*", (req, res) => {
    res.json({ Error: `Invalid Url ${req.originalUrl}` });
})
app.listen(port, () => console.log(`Server is listening on port ${port}!`))