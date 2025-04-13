import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/connectdb.js';
import authRouter from './route/authRoutes.js';
import taskRouter from './route/taskRoutes.js';


const Port = 8000;
const app = express();
db();


dotenv.config()
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*',
    credentials: true,
}))

app.use(express.json())
app.use('/auth', authRouter)
app.use('/task', taskRouter)


app.listen(Port, ()=>{
    console.log(`Server is running on port ${Port}`)
})