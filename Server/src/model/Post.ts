export class Post{
    private _id : number;
    private _author : number;
    private _title : string;
    private _recipeEntries : String[];

    constructor (id : number, author : number, title : string, recipeEntries : string[]){
        this._id = id;
        this._author = author;
        this._title = title;
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

    get title(): String {
        return this._title;
    }

    set title(value: String) {
        this._title = value;
    }

    get recipeEntries(): [] {
        return this._recipeEntries;
    }

    set recipeEntries(value: []) {
        this._recipeEntries = value;
    }

    get desc(): String {
        return this._desc;
    }

    set desc(value: String) {
        this._desc = value;
    }

    private _desc : String;

}