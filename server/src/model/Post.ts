import { RecipeEntries } from "../model/RecipeEntries";

export class Post{
    private _id : number;
    private _author : number;
    private _title : string;
    private _desc : string;
    private _recipeEntries : RecipeEntries[];

    constructor (id : number, author : number, title : string, desc : string,  recipeEntries : RecipeEntries[]){
        this._id = id;
        this._author = author;
        this._title = title;
        this._desc = desc;
        this._recipeEntries = recipeEntries;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get author(): number {
        return this._author;
    }

    set author(value: number) {
        this._author = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get recipeEntries(): RecipeEntries[] {
        return this._recipeEntries;
    }

    set recipeEntries(values: RecipeEntries[]) {
        this._recipeEntries = values;
    }

    get desc(): string {
        return this._desc;
    }

    set desc(value: string) {
        this._desc = value;
    }


}