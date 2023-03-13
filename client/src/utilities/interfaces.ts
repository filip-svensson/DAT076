export interface IIngredient {
    name: string
}
export interface IRecipeEntry {
    ingredient: IIngredient;
    amount: number;
    unit: string;
}
export interface IReview {
    userID: string;
    comment: string;
    rating: number;
    date: number;
}

export interface IPost {
    _id : string;
    author : string;
    title : string;
    description : string;
    recipeEntries : IRecipeEntry[];
    reviews : IReview[];
}

export interface IUser {
    _id: string;
    username: string;
    password: string;
    favouritePosts: IPost[];
}
