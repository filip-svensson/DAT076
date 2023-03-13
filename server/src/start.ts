import cors from "cors";
import express from "express";
import session from "express-session";

import { postRouter } from "./router/Post";
import { userRouter } from "./router/User";


export const app = express();

app.use(session({
    secret: "Your secret key", // TODO: Move to separate file. DO NOT UPLOAD TO GITHUB, we dont care about security
    resave: false,
    saveUninitialized: true
}));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());


app.use("/post", postRouter)
app.use("/user", userRouter)