

export interface IIngredient {
    name: string
}
export interface IRecipeEntry {
    ingredient: IIngredient;
    amount: string;
}
export interface IComment {
    id: string;
    user: string;
    message: string;
    date: number;
}
export interface IRating {
    user : string;
    score : number;
}
export interface IPost {
    id : string;
    author : string;
    title : string;
    description : string;
    recipeEntries : IRecipeEntry[];
    comments : IComment[];
    ratings : IRating[];
}