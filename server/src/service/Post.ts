import { v4 as uuidv4 } from 'uuid';

import { Post } from "../model/Post";
import { RecipeEntry } from "../model/RecipeEntry";
import { Comment } from "../model/Comment";
import { Rating } from "../model/Rating";


export interface IPostService {
    createPost(author: {id: string, name: string}, title: string, description: string, recipeEntries: RecipeEntry[]) : Promise<Post>;
    getPost(id: string): Promise<Post | undefined>;
    getPosts(): Promise<Post[]>;
    getUserPosts(userID: string): Promise<Post[]>;
    addComment(postID: string, userID: string, message: string): Promise<boolean>;
    addRating(postID: string, userID: string, rating: number): Promise<boolean>;
    changeRating(postID: string, userID: string, rating: number): Promise<boolean>;
}

class PostService implements IPostService {
    posts: Array<Post> = [];
    /**
     * Creates a new post
     * @param author author of post {id, name}
     * @param title title of post
     * @param description description of post
     * @param recipeEntries recipeEntries of post
     * @returns the newly created post
     */
    async createPost(author: {id: string, name: string}, title: string, description: string, recipeEntries: RecipeEntry[]): Promise<Post> {
        const id = uuidv4();
        const newPost = new Post(id, author, title, description, recipeEntries);
        this.posts.push(newPost);
        return newPost;
    }
    
    /**
     * Gets a post by ID
     * @param postID the post's ID 
     * @returns the post or undefined if it doesn't exists
     */
    async getPost(postID: string): Promise<Post | undefined> {
        const post : Post | undefined = this.posts.find(post => post.id === postID);
        return post;
    }
    /**
     * Gets all posts
     * @returns an array with posts, the array will be empty if no posts are made
     */
    async getPosts(): Promise<Post[]> {
        return this.posts;
    }
    
    /**
     * Gets all post made by a user with said ID
     * @param userID The id of the user
     * @returns an array of the users post, the array will be empty if no posts are made
     */
    async getUserPosts(userID : string): Promise<Post[]> {
        return this.posts.filter(post => post.author.id === userID)
    }
    /**
     * Adds a comment from user with userID to post with postID
     * @param postID ID of the post the comment was posted under
     * @param userID ID of user who posted the comment
     * @param message message of the comment
     * @returns true if the comment was added correctly | false if it was not added correctly
     */
    async addComment(postID: string, userID: string, message: string): Promise<boolean> {
        const newCommentPost = this.posts.find(post => post.id === postID);
        if (newCommentPost == null) {return false;}
        const id = uuidv4();
        newCommentPost.addComment(new Comment(id, userID, message));
        return true;
    }
    /**
     * Adds a rating from user with userID to post with postID
     * @param postID ID of the post the rating was meant for
     * @param userID ID of user who rated
     * @param rating the rating of the post from user
     * @returns true if the rating was added correctly | false if the post did not exist
     */
    async addRating(postID: string, userID: string, rating: number): Promise<boolean> {
        const newRatingPost = this.posts.find(post => post.id === postID);
        if (newRatingPost == null) {return false;}
        newRatingPost.addRating(new Rating(userID, rating));
        return true;
    }
    /**
     * Changes the rating from user with userID in post with postID
     * @param postID the post rated
     * @param userID the user who made the rating
     * @param rating the new rating value
     * @returns true if the rating was changed correctly | false if post or rating did not exist
     */
    async changeRating(postID: string, userID: string, rating: number): Promise<boolean> {
        const userRating = await this.getRating(postID, userID);
        if(userRating == null) { return false;}
        userRating.score = rating;
        return true;
    }
    /**
     * Gets rating with specified post and user ID
     * @param postID the post ID
     * @param userID the user ID
     * @returns returns the rating if it exists, undefined if it can not be found
     */
    async getRating(postID: string, userID: string): Promise<Rating | undefined> {
        const post = this.posts.find(post => post.id === postID);
        return post?.ratings.find(rating => rating.user === userID);
    }

}

export function makePostService() : PostService {
    return new PostService();
}