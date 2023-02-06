import express, { Request, Response } from "express";
import { makePostService } from "../service/Post";
import { Post } from "../model/Post";
import {RecipeEntries} from "../model/RecipeEntries";

const postService = makePostService();

export const postRouter = express.Router();

postRouter.get("/", async (
    req : Request<{},{},{}>,
    res : Response<Array<Post> | String >
) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).send(posts);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

postRouter.get("/:id", async (
    req : Request<{id: string},{},{}>,
    res : Response<Post | String >
) => {
    try {
        if (req.params.id == null) {
            res.status(400).send(`Bad GET call to ${req.originalUrl} --- missing id parameter`)
            return;
        }
        const index = parseInt(req.params.id, 10);
        const post = await postService.getPost(index);
        if (post == null) {
            res.status(404).send(`No post with index ${index}`);
            return;
        }
        res.status(200).send(post);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})

postRouter.post("/", async (
    req : Request<{},{},{author : number, title : string, desc : string, recipeEntries : RecipeEntries[]}>, /*Might be horribly wrong*/
    res : Response<Post | String>
) => {
    const author = req.body.author;
    const title = req.body.title;
    const desc = req.body.desc;
    const recipeEntries = req.body.recipeEntries;
    try {
        if (typeof(author) !== "number") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- author has type ${typeof(author)}`)
            return;
        }
        if (typeof(title) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- title has type ${typeof(title)}`)
            return;
        }
        if (typeof(desc) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- recipe has type ${typeof(desc)}`)
            return;
        }
        if (typeof(recipeEntries) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- recipe has type ${typeof(recipeEntries)}`)
            return;
        }
        const newPost = await postService.newPost(author, title, desc, recipeEntries);
        res.status(201).send(newPost);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})