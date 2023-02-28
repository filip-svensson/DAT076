import {Schema, Model} from "mongoose";
import {conn} from "./conn";

import { IComment } from "../src/model/Comment";

const commentSchema : Schema = new Schema({
    id : String,
    user : String,
    message : String,
    date : Number,
});

export const commentModel = conn.model<IComment>("Comment", commentSchema);