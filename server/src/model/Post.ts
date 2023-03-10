import { RecipeEntry } from "./RecipeEntry";
import { Review } from "./Review";

export interface IPost {
    id : string;
    author : string;
    title : string;
    description : string;
    recipeEntries : RecipeEntry[];
    reviews : Review[];
}

export class Post implements IPost {
    id : string;
    author : string;
    title : string;
    description : string;
    recipeEntries : RecipeEntry[];
    reviews : Review[];

    
    constructor (id : string, author : string, title : string, description : string, recipeEntries : RecipeEntry[]) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.description = description;
        this.recipeEntries = recipeEntries;
        this.reviews = [];
    }
}