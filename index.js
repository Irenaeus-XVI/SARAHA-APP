import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import { connection } from './db/connection.js';
const app = express()
app.use(express.json());
import userRoutes from './src/modules/user/user.routes.js';
const port = 3000
connection();
app.use("/api/v1/user", userRoutes);
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is listening on port ${port}!`))