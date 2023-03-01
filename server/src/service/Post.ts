import { v4 as uuidv4 } from 'uuid';

import { IPost, Post } from "../model/Post";
import { RecipeEntry } from "../model/RecipeEntry";
import { Comment } from "../model/Comment";
import { IRating, Rating } from "../model/Rating";
import { postModel } from '../../db/Post.db';
import { ingredientModel } from '../../db/Ingredient.db';


interface IPostService {
    createPost(author: string, title: string, description: string, recipeEntries: RecipeEntry[]) : Promise<IPost>;
    getPost(id: string): Promise<IPost | null>;
    getPosts(): Promise<IPost[]>;
    getUserPosts(userID: string): Promise<IPost[]>;
    addComment(postID: string, userID: string, message: string): Promise<boolean>;
    addRating(postID: string, userID: string, rating: number): Promise<boolean>;
    changeRating(postID: string, userID: string, rating: number): Promise<boolean>;
    getRating(postID: string, userID: string): Promise<Rating | null>;
}

class PostService implements IPostService {
    
    /**
     * Creates a new post
     * @param author author of post {id, name}
     * @param title title of post
     * @param description description of post
     * @param recipeEntries recipeEntries of post
     * @returns the newly created post
     */
    async createPost(author: string, title: string, description: string, recipeEntries: RecipeEntry[]): Promise<IPost> {
        const id = uuidv4();
        const newPost = await postModel.create({
            id : id, 
            author: author,
            title: title,
            description: description,
            recipeEntries: recipeEntries,
            comments: [],
            ratings: []
        });
        return newPost;
    }
    
    /**
     * Gets a post by ID
     * @param postID the post's ID 
     * @returns the post or undefined if it doesn't exists
     */
    async getPost(postID: string): Promise<IPost | null> {
        const post : IPost | null = await postModel.findOne({"id":postID});
        return post;
    }
    /**
     * Gets all posts
     * @returns an array with posts, the array will be empty if no posts are made
     */
    async getPosts(): Promise<IPost[]> {
        return await postModel.find();
    }
    
    /**
     * Gets all post made by a user with said ID
     * @param userID The id of the user
     * @returns an array of the users post, the array will be empty if no posts are made
     */
    async getUserPosts(userID : string): Promise<IPost[]> {
        return await postModel.find({"author":userID});
    }
    /**
     * Adds a comment from user with userID to post with postID
     * @param postID ID of the post the comment was posted under
     * @param userID ID of user who posted the comment
     * @param message message of the comment
     * @returns true if the comment was added correctly | false if it was not added correctly
     */
    async addComment(postID: string, userID: string, message: string): Promise<boolean> {
        const post : Post | null = await postModel.findOne({"id":postID});
        if (post == null) {return false;}
        const id = uuidv4();
        post.addComment(new Comment(id, userID, message));
        await postModel.findOneAndUpdate({"id":postID}, post, function(err : any, _ : any) {
            if (err) return false;
            return true;
        });
        return false;
    }
    /**
     * Adds a rating from user with userID to post with postID
     * @param postID ID of the post the rating was meant for
     * @param userID ID of user who rated
     * @param rating the rating of the post from user
     * @returns true if the rating was added correctly | false if the post did not exist
     */
    async addRating(postID: string, userID: string, rating: number): Promise<boolean> {
        const post : Post | null = await postModel.findOne({"id":postID});
        if (post == null) {return false;}
        post.addRating(new Rating(userID, rating));
        await postModel.findOneAndUpdate({"id":postID}, post, {upsert : true}, function(err : any, _ : any) {
            if (err) return false;
            return true;
        });
        return false;
    }
    /**
     * Changes the rating from user with userID in post with postID
     * @param postID the post rated
     * @param userID the user who made the rating
     * @param rating the new rating value
     * @returns true if the rating was changed correctly | false if post or rating did not exist
     */
    async changeRating(postID: string, userID: string, rating: number): Promise<boolean> {
        await postModel.findOneAndUpdate({"id":postID, "ratings" : { "user" : userID }}, { $set : {"score" : rating}} , function(err : any, _ : any) {
            if (err) return false;
            return true;
        });
        return false;
    }
    /**
     * Gets rating with specified post and user ID
     * @param postID the post ID
     * @param userID the user ID
     * @returns returns the rating if it exists, undefined if it can not be found
     */
    async getRating(postID: string, userID: string): Promise<Rating | null> {
        const rating : IRating | null = await postModel.findOne({"id":postID, "ratings" : {"user" : userID}});
        return rating;
    }

}

export function makePostService() : PostService {
    return new PostService();
}