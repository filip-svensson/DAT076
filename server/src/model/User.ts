import { ObjectId, Schema } from "mongoose";
import { Post } from "./Post";

export interface IUser {
    _id: Schema.Types.ObjectId;
    username: string;
    password: string;
    favouritePosts: ObjectId[];
}

export class User implements IUser {
    _id: Schema.Types.ObjectId;
    username: string;
    password: string;
    favouritePosts: ObjectId[];

    constructor(_id: ObjectId, username: string, password: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.favouritePosts = [];
        
    }
    
}