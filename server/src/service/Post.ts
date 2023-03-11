

import { IPost, Post } from "../model/Post";
import { RecipeEntry } from "../model/RecipeEntry";
import { postModel } from '../../db/Post.db';

import { Review } from '../model/Review';
import { ObjectId } from 'mongodb';
import { IUser } from "../model/User";
import { Schema } from "mongoose";


interface IPostService {
    createPost(author: string, title: string, description: string, recipeEntries: RecipeEntry[]) : Promise<IPost>;
    getPost(id: string): Promise<IPost | null>;
    getPosts(): Promise<IPost[]>;
    getUserPosts(userID: string): Promise<IPost[]>;
    addReview(postID: string, userID: string, comment: string, rating: number): Promise<boolean>;
    removeReview(postID: string, userID: string): Promise<Boolean>;
    findReview(postID: string, userID: string): Promise<Boolean>;
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
        
        const newPost = await postModel.create({
            author: author,
            title: title,
            description: description,
            recipeEntries: recipeEntries,
            reviews: []
        });
        return newPost;
    }
    
    /**
     * Gets a post by ID
     * @param postID the post's ID 
     * @returns the post or undefined if it doesn't exists
     */
    async getPost(postID: string): Promise<IPost | null> {
        const post : IPost | null = await postModel.findOne({_id: new ObjectId(postID)});
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

    
    async getUserFavourites(user : IUser) : Promise<IPost[]> {
        const userFavs = user.favouritePosts;
        const favourites = await postModel.find({_id : {$in : {userFavs}}})
        return favourites;
    }
    
    


    /**
     * Adds a users review to a post
     * @param postID post the review is meant for
     * @param userID user that made the review
     * @param comment  optional comment with the rating
     * @param rating rating, 1-5
     * @returns true if successfully added, false if not
     */
    async addReview(postID: string, userID: string, comment: string, rating: number): Promise<boolean> {
        const review = new Review(new ObjectId(userID), comment, rating);
        const res = await postModel.updateOne({_id:postID}, {$push : {reviews : review}})
        if (!res.acknowledged) return false; 
        return true;
    }
    
    /**
     * Remove a users review from a post
     * @param postID post that contains the review
     * @param userID user that made the review
     * @returns true if successfully deleted, false if not
     */
    async removeReview(postID: string, userID: string): Promise<Boolean>{
        const res = await postModel.updateOne({_id:postID}, {$pull : {reviews : {userID:userID}}});
        if(res.modifiedCount == 1){
            return true;
        }
        return false;
    }

    /**
     * Checks if a user already made a review
     * @param postID post to check
     * @param userID user to look for
     * @returns true if the user made a review, false if not or if post doesnt exists
     */
    async findReview(postID: string, userID: string): Promise<Boolean>{
        const res = await postModel.findOne({_id:postID, reviews:{$elemMatch: {userID:userID}}});
        if(res == null){
            return false;
        }
        return true;
    }
 
    

}

export function makePostService() : PostService {
    return new PostService();
}