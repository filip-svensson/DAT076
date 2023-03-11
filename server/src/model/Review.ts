import { ObjectId } from "mongoose";


export interface IReview {
    userID: string;
    comment: string;
    rating: number;
    date: number;
}

export class Review {

    userID: ObjectId;
    comment: string;
    rating: number;
    date: number;
    
    constructor (userID : ObjectId, comment : string, rating: number) {
        this.userID = userID;
        this.comment = comment;
        this.rating = rating;
        this.date = Date.now();
    }
}