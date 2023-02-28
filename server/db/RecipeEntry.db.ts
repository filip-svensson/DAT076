import {Schema, Model} from "mongoose";
import {conn} from "./conn";
import { ObjectId } from "mongodb";
import { IRecipeEntry} from "../src/model/RecipeEntry";


const recipeEntrySchema : Schema = new Schema({
    ingredient : {
        type : ObjectId,
        ref : 'Ingredient'
    },
    amount : Number,
    unit : String,
});

export const recipeEntryModel = conn.model<IRecipeEntry>("RecipeEntry", recipeEntrySchema);