export interface IRating {
    user : string;
    score : number;
}

export class Rating {
    user : string;
    score : number;
    constructor (user : string, score : number) {
        this.user = user;
        this.score = score;
    }
}