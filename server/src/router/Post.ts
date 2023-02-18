import express, { Request, Response } from "express";
import { makePostService } from "../service/Post";

import { IPost } from "../model/Post"
import { IRecipeEntry } from "../model/RecipeEntry";
import { IUser } from "../model/User";

const postService = makePostService();
export const postRouter = express.Router();



// Request interface for Post
type PostRequest = Request & {
    body: {
        title: string,
        description: string,
        recipeEntries: IRecipeEntry[]
    }
    session: {
        user ?: IUser
    }
}
/**
 * Post request for a new post
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
        const newPost = await postService.createPost(user.id, title, description, recipeEntries);
        res.status(201).send(newPost);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})
type CommentRequest = Request & {
    body: {
        postID: string,
        message: string
    }
    session: {
        user ?: IUser
    }
}
/**
 * Post request for a new comment on a post with specified ID
 */
postRouter.post("/comment", async (
    req: CommentRequest,
    res: Response<string>
) => {
    try {
        const {postID, message} = req.body;
        const user = req.session.user;
        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (typeof(postID) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- postID has type ${typeof(postID)}`)
            return;
        }
        if (typeof(message) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- message has type ${typeof(message)}`)
            return;
        }
        const postWithNewComment = await postService.addComment(postID, user.id, message);
        if (!postWithNewComment) {
            res.status(404).send(`No post with index ${postID}`);
            return;
        }
        res.status(201).send(`Comment added to post ${postID}`)
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})
type RatingRequest = Request & {
    body: {
        postID: string,
        rating: number
    }
    session: {
        user ?: IUser
    }
    
}
/**
 * Post request for a new rating on a post with specified ID
 */
postRouter.post("/rating", async (
    req: RatingRequest,
    res: Response<string>
) => {
    try {
        const {postID, rating} = req.body;
        const user = req.session.user;
        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (typeof(postID) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- postID has type ${typeof(postID)}`)
            return;
        }
        if (typeof(rating) !== "number") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- message has type ${typeof(rating)}`)
            return;
        }
        if(![1,2,3,4,5].includes(rating)){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- rating ${rating} is not one of [1,2,3,4,5]`)
            return;
        }
        const alreadyRated = await postService.getRating(postID, user.id);
        if(alreadyRated != null) {
            res.status(409).send(`User already rated postID: (${postID}), to change rating use PUT method.`);
            return;
        }

        const postWithNewRating = await postService.addRating(postID, user.id, rating);
        if (!postWithNewRating) {
            res.status(404).send(`No post with index ${postID}`);
            return;
        }
        res.status(201).send(`Rating added to post ${postID}`);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})

postRouter.put("/rating", async (
    req: RatingRequest,
    res: Response<string>
) => {
    try {
        const {postID, rating} = req.body;
        const user = req.session.user;
        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (typeof(postID) !== "string") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- postID has type ${typeof(postID)}`)
            return;
        }
        if (typeof(rating) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- message has type ${typeof(rating)}`)
            return;
        }
        if(![1,2,3,4,5].includes(rating)){
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- rating ${rating} is not in [1,2,3,4,5]`)
            return;
        }
        const ratingChanged = await postService.changeRating(postID, user.id, rating);
        if(!ratingChanged){
            res.status(404).send(`Post or rating not found with post ID ${postID}`);
            return;
        }
        res.status(201).send(`Rating updated for post ${postID}`);
    } catch (err: any) {
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
postRouter.get("/all/user/:id", async (
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
