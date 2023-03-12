import { ObjectId } from "mongoose";
import { Post } from "./Post";

export interface IUser {
    _id: string;
    username: string;
    password: string;
    favouritePosts: string[];
}

export class User implements IUser {
    _id: string;
    username: string;
    password: string;
    favouritePosts: string[];

    constructor(_id: string, username: string, password: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.favouritePosts = [];
        
    }
    
}