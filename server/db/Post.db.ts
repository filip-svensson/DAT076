import {Schema, Model} from "mongoose";
import {conn} from "./conn";
import { IPost } from "../src/model/Post"

const postSchema : Schema = new Schema({
    id : String,
    author : String,
    title : String,
    description : String,
    recipeEntries : [{
        ingredient : {
            name : String,
        },
        amount : String,
        unit : String,  
    }],
    comments : [{
        id : String,
        user : String,
        message : String,
        date : Number,
    }],
    ratings : [{
        user : String,
        score : Number,
    }],
});

export const postModel = conn.model<IPost>("Post", postSchema);