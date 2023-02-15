import express from "express";
import { postRouter } from "./router/Post";
import cors from "cors";

export const app = express();

app.use(cors());
app.use("/Post", postRouter);