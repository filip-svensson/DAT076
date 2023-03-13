import express, { Request, Response } from "express";

import { makePostService } from "../service/Post";
import { IPost } from "../model/Post"
import { IRecipeEntry } from "../model/RecipeEntry";
import { IUser } from "../model/User";


const postService = makePostService();
export const postRouter = express.Router();

type SessionRequest = Request & {
    session: {
        user ?: IUser
    }
}

interface PostRequest extends SessionRequest {
    body: {
        title: string,
        description: string,
        recipeEntries: IRecipeEntry[]
    }
}
/**
 * Post request to create a new post
 */
postRouter.post("/", async (
    req: PostRequest,
    res: Response<IPost | string>
) => {
    try {
        const {title, description, recipeEntries} = req.body;
        const user = req.session.user;
        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (typeof(title) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- title has type ${typeof(title)}`)
            return;
        }
        if (typeof(description) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- description has type ${typeof(description)}`)
            return;
        }
        if (typeof(recipeEntries) !== "object") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- recipeEntries has type ${typeof(recipeEntries)}`)
            return; 
        }
        const newPost = await postService.createPost(user._id.toString(), title, description, recipeEntries);
        res.status(201).send(newPost);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})




interface ReviewRequest extends SessionRequest {
    body: {
        postID: string,
        comment: string
        rating: number
    }
}
/**
 * Post request for a new comment on a post with specified ID
 */
postRouter.post("/review", async (
    req: ReviewRequest,
    res: Response<string>
) => {
    try {
        const {postID, comment, rating} = req.body;

        const user = req.session.user;
        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (typeof(postID) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- postID has type ${typeof(postID)}`);
            return;
        }
        if (typeof(comment) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- message has type ${typeof(comment)}`);
            return;
        }
        if (typeof(rating) !== "number") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- rating has type ${typeof(rating)}`);
            return;
        }
        if(![1,2,3,4,5].includes(rating)){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- rating ${rating} is not one of [1,2,3,4,5]`);
            return;
        }

        const alreadyReviewed = await postService.findReview(postID, user._id);
        if(alreadyReviewed){
            res.status(409).send(`Bad POST call to ${req.originalUrl} --- user already reviewed this post`);
            return;
        }

        const postWithNewReview = await postService.addReview(postID, user._id, comment, rating);
        if (postWithNewReview == null) {
            res.status(404).send(`No post with index ${postID}`);
            return;
        }
        res.status(201).send(`Review added to post ${postID}`)
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})


interface ReviewDeleteRequest extends SessionRequest {
    body: {
        postID : string,
    }
}
/**
 * Deletes a review by session user
 */
postRouter.delete("/review", async (
    req: ReviewDeleteRequest,
    res: Response<String>
) => {
    try {
        const {postID} = req.body;
        const user = req.session.user;

        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (typeof(postID) !== "string") {
            res.status(400).send(`Bad DELETE call to ${req.originalUrl} --- postID has type ${typeof(postID)}`);
            return;
        }
        const hasReviewed = await postService.findReview(postID, user._id);
        if(!hasReviewed){
            res.status(409).send(`Bad DELETE call to ${req.originalUrl} --- user has not reviewed this post`);
            return;
        }
        const reviewDeleted = await postService.removeReview(postID, user._id);
        if(!reviewDeleted){
            res.status(500).send(`Something went wrong trying to delete the review with ${user._id}`);
            return;
        }
        res.status(204).send(`Review by ${user._id} has been deleted successfully.`);
    } catch (err : any) {
        res.status(500).send(err.message);
    }
})

/**
 * Get request for all posts
 */
postRouter.get("/all", async (
    req: Request<{},{},{}>,
    res: Response<IPost[]>
) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).send(posts);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})
/**
 * Get request for all posts from user with specified ID 
 */
postRouter.get("/all/user/:id/", async (
    req: Request<{id: string},{},{}>,
    res: Response<IPost[]>
) => {
    try {
        const posts = await postService.getUserPosts(req.params.id);
        res.status(200).send(posts);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})
/**
 * Get request for specific post with specified ID
 */
postRouter.get("/:id", async (
    req: Request<{id: string},{},{}>,
    res: Response<IPost | String>
) => {
    try {
        const { id } = req.params;
        const post = await postService.getPost(id);
        if (post == null) {
            res.status(404).send(`No post with index ${id}`);
            return;
        }
        res.status(200).send(post);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})
