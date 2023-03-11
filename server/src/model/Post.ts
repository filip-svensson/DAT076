import { RecipeEntry } from "./RecipeEntry";
import { Review } from "./Review";
import { ObjectId } from "mongoose";

export interface IPost {
    _id : ObjectId;
    author : ObjectId;
    title : string;
    description : string;
    recipeEntries : RecipeEntry[];
    reviews : Review[];
}

export class Post implements IPost {
    _id : ObjectId;
    author : ObjectId;
    title : string;
    description : string;
    recipeEntries : RecipeEntry[];
    reviews : Review[];

    
    constructor (_id : ObjectId, author : ObjectId, title : string, description : string, recipeEntries : RecipeEntry[]) {
        this._id = _id;
        this.author = author;
        this.title = title;
        this.description = description;
        this.recipeEntries = recipeEntries;
        this.reviews = [];
    }
}