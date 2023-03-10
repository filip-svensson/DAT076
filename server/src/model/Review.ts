export interface IReview {
    userID: string;
    comment: string;
    rating: number;
    date: number;
}

export class Review {
    userID: string;
    comment: string;
    rating: number;
    date: number;
    
    constructor ( userID : string, comment : string, rating: number) {
        this.userID = userID;
        this.comment = comment;
        this.rating = rating;
        this.date = Date.now();
    }
}