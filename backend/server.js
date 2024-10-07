import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from "mongoose";

/* CONNECT TO MONGO DB */
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log('Error connecting with MongoDB', error));
db.once('open', () => console.log('Connected to MongoDB'));

/* ROUTERS */
import {router as authRouter} from './routers/authRouter.js';
import {router as tasksRouter} from './routers/tasksRouter.js';
import isAuthorized from "./middlewares/isAuthorized.js";
import rateLimiter from "./utils/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 4000;

/* APPLYING MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend origin
  credentials: true, // Allow credentials (cookies)
}));

/* IF TIME PERMITS, CREATE A OUTPUT WRITE STREAM FOR HTTP REQUESTS LOG */
// app.use(morgan('combined', {stream: writeLogStream}))
app.get('test', (req, res) => {
    res.send('test');
})

app.use('/auth', rateLimiter, authRouter);       // in the problem statment i am required to create a route for users but it was also said that i can customize the routes so i have renamed the route to auth
app.use('/api/tasks',rateLimiter, isAuthorized, tasksRouter);

app.listen(PORT, () => {
    console.log('Server is running on', PORT);
})