export class User{
    _id : number;
    _username : string;



    get id(): number{
        return this.id
    }
    set id(value: number){
        this.id = value
    }
    get username(): string{
        return this.username
    }
    set username(value: String){
        this._username = value
    }
}