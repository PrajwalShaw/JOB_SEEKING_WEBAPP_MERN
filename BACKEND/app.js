import express from "express";
import dotenv from "dotenv";
import cors from "cors";//cors is used to connect our frontend with backend
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/error.js";

const app = express();//created an instance

dotenv.config({path : "./config/config.env"});

app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","DELETE","PUT"],
    credentials : true,
}));

app.use(cookieParser());//agar cookieParser rahega nahi toh user ko authenticate kaise karenge
app.use(express.json());//sirf json data ko parse karta hain
app.use(express.urlencoded({extended: true}));//string ko json format main convert kar deta hain

//for uploading files
app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : "/tmp/",
    })
);

app.use('/api/v1/user',userRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/job',jobRouter);

dbConnection();





app.use(errorMiddleware);

export default app;