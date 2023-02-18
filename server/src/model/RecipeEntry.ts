import { Ingredient } from "./Ingredient";

export interface IRecipeEntry {
    ingredient: Ingredient;
    amount: string;
}
export class RecipeEntry implements IRecipeEntry {
    ingredient: Ingredient;
    amount: string;

    constructor(ingredient: Ingredient, amount: string){
        this.ingredient = ingredient;
        this.amount = amount;
    }
}