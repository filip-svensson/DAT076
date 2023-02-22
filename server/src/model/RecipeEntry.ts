import { Ingredient } from "./Ingredient";

export interface IRecipeEntry {
    ingredient: Ingredient;
    amount: string;
    unit: string;
}
export class RecipeEntry implements IRecipeEntry {
    ingredient: Ingredient;
    amount: string;
    unit: string;

    constructor(ingredient: Ingredient, amount: string, unit: string ){
        this.ingredient = ingredient;
        this.amount = amount;
        this.unit = unit;
    }
}