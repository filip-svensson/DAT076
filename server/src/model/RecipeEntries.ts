import { Ingredient } from "../model/Ingredient"


export class RecipeEntries {
    private _ingredient : Ingredient;
    private _amount : string;

    constructor (ingredient : Ingredient, amount : string){
        this._ingredient = ingredient;
        this._amount = amount;
    }

    get ingredient(): Ingredient {
        return this._ingredient;
    }

    set ingredient(value: Ingredient) {
        this._ingredient = value;
    }

    get amount(): string {
        return this._amount;
    }

    set amount(value: string) {
        this._amount = value;
    }

}