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
    reviews : [{
        userID : String,
        comment : String,
        rating : Number,
        date : Number,
    }]
});

export const postModel = conn.model<IPost>("Post", postSchema);