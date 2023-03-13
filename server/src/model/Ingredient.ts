export interface IIngredient {
    name : string;
}
export class Ingredient {
    name : string;
    constructor(name : string){
        this.name = name;
    }
}