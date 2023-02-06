export class User{
     private _id : number
     private _username : string
     private _favoritePost : number[] | undefined



    constructor(id : number, username : string, favoritePost? : number[]) {
         this._username = username;
         this._id = id;
         this._favoritePost = favoritePost;

    }

    get id(): number{
        return this._id
    }
    set id(value: number){
        this._id = value
    }
    get username(): string{
        return this._username
    }
    set username(value: string){
        this._username = value
    }
    get favoritePost(): number[] | undefined{
         return this._favoritePost
    }
    set favoritePost(value : number[] | undefined){
         this._favoritePost = value
    }
}