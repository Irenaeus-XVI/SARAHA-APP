import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { connection } from './db/connection.js';
import userRoutes from './src/modules/user/user.routes.js';
const app = express()
const port = 3000
connection();
app.use("/api/v1/user", userRoutes);
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is listening on port ${port}!`))