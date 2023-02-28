import {Schema, Model} from "mongoose";
import {conn} from "./conn";
import { IIngredient } from "../src/model/Ingredient";


const ingredientSchema : Schema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    }
});

export const ingredientModel = conn.model<IIngredient>("Ingredient", ingredientSchema);