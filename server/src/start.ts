import express from "express";
import { postRouter } from "./router/Post";

export const app = express();

app.use(express.json());
app.use("/Post", postRouter);