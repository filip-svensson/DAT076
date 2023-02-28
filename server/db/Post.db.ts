import {Schema, Model} from "mongoose";
import {conn} from "./conn";
import { IPost } from "../src/model/Post"

const postSchema : Schema = new Schema({
    id : String,
    author : String,
    title : String,
    description : String,
    recipeEntries : [{
        type : Schema.Types.ObjectId,
        ref : 'RecipeEntry',
    }],
    comments : [{
        type : Schema.Types.ObjectId,
        ref : 'Comment',
    }],
    ratings : [{
        type : Schema.Types.ObjectId,
        ref : 'Rating'
    }],
});

export const postModel = conn.model<IPost>("Post", postSchema);