export class Ingredient {
    private _name : string

    constructor(name : string){
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(name : string) {
        this._name = name;
    }
}