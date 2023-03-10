import {Schema} from "mongoose";
import {conn} from "./conn";
import { IUser } from '../src/model/User';

const userSchema : Schema = new Schema({
    username : String,
    password : String,
    favouritePosts : [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
});

export const userModel = conn.model<IUser>("User", userSchema);