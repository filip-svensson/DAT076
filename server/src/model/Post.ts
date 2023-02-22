import { RecipeEntry } from "./RecipeEntry"
import { Comment } from "./Comment"
import { Rating } from "./Rating";

export interface IPost {
    id : string;
    author : {
        id: string,
        name: string
    };
    title : string;
    description : string;
    recipeEntries : RecipeEntry[];
    comments : Comment[];
    ratings : Rating[];
}
export class Post implements IPost {
    id : string;
    author : {
        id: string,
        name: string
    };
    title : string;
    description : string;
    recipeEntries : RecipeEntry[];
    comments : Comment[];
    ratings : Rating[];
    
    constructor (id : string, author : {id: string, name: string}, title : string, description : string, recipeEntries : RecipeEntry[]) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.description = description;
        this.recipeEntries = recipeEntries;
        this.comments = [];
        this.ratings = [];
    }
    /**
     * Adds a comment to Post
     * @param comment comment to add to Post
     */
    addComment(comment : Comment) {
        this.comments.push(comment);
    }
    /**
     * Removes a comment to Post
     * @param commentID ID of comment to remove
     */
    removeComment(commentID : string) {
        this.comments = this.comments.filter(comment => comment.id !== commentID)
    }
    
    /**
     * Adds a rating to the Post
     * @param rating
     */
    addRating(rating : Rating){
        this.ratings.push(rating);
    }
}