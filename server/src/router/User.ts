import express, {Request, Response} from "express";
import { makeUserService } from "../service/User";
import validator from "validator";

import { IUser } from "../model/User";
import { IPost } from "../model/Post";


const userService = makeUserService();
export const userRouter = express.Router();


type SessionRequest = Request & {
    session: {
        user ?: IUser
    }
}

interface UserRequest extends SessionRequest {
    body: {
        username: string,
        password: string
    }
}

/**
 * Creates a user
 */
userRouter.post("/", async (
    req: UserRequest,
    res: Response<string>
) => {
    try {
        const {username, password} = req.body;
        if (typeof(username) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- username has type ${typeof(username)}`)
            return;
        }
        if (typeof(password) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- password has type ${typeof(password)}`)
            return;
        }
        if (username.length <= 3 || 15 <= username.length) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- username has to be between 4-14 in length`)
            return;
        }
        if (!validator.matches(username,"^[a-zA-Z0-9]*$")) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- username may only use characters: ^[a-zA-Z0-9]*$`)
            return;
        }
        if (password.length <= 7 || 15 <= password.length) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- password has to be between 8-14 in length`)
            return;
        }
        if (!validator.matches(password, "^[a-zA-Z0-9]*$")) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- password may only use characters: ^[a-zA-Z0-9]*$`)
            return;
        }
        const newUser = await userService.createUser(username, password, "");
        if (!newUser) {
            res.status(409).send(`User with username ${username} already exists`);
            return;
        }
        res.status(201).send("User created");
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})

/**
 * Logs a user into session
 */
userRouter.post("/login", async (
    req: UserRequest,
    res: Response<IUser | string>
) => {
    try {
        const {username, password} = req.body;
        if (typeof(username) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- username has type ${typeof(username)}`)
            return;
        }
        if (typeof(password) !== "string") {
            res.status(400).send(`Bad POST passwordcall to ${req.originalUrl} --- password has type ${typeof(password)}`)
            return;
        }
        const user = await userService.findUser(username, password);
        if (user == null) {
            res.status(401).send("Bad username or password");
            return;
        }
        req.session.user = user;
        res.status(200).send(user);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})

/**
 * Logs out session user
 */
userRouter.post("/logout", async (
    req: SessionRequest,
    res: Response<string>
) => {
    try {
        if (req.session.user == null){
            res.status(204).send();
            return;
        }
        req.session.user = undefined;
        res.status(200).send("Logged out");
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})

/**
 * Get the username associated with :id
 */
userRouter.get("/username/:id", async (
    req: Request<{id: string},{},{}>,
    res: Response<string>
) => {
    try {
        const id = req.params.id
        const username = await userService.findUsername(id);
        if (username == null) {
            res.status(404).send(`No user with id ${id}`);
            return;
        }
        res.status(200).send(username);
    } catch (err: any) {
        res.status(500).send(err.message);
    }
})

interface UserFavoritePostRequest extends SessionRequest {
    body: {
        postID : string
    }
}

/**
 * Add post to session users favourites
 */
userRouter.post("/favourite", async (
    req : UserFavoritePostRequest,
    res: Response<string>
) => {
    try {
        const {postID} = req.body;
        const user = req.session.user;

        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        if (typeof(postID) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- postID has type ${typeof(postID)}`);
            return;
        }
        const result = await userService.addUserFavourite(user._id, postID);
        if (!result) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- post is already a favourite`);
            return;
        }
        res.status(200).send(`PostID ${postID} added as a favourite for user ${user.username}`);
    } catch (err : any){
        res.status(500).send(err.message);
    }
});

/**
 * Get the favourite posts of the session user
 */
userRouter.get("/favourite", async (
    req : SessionRequest,
    res: Response<IPost[] | string>
) => {
    try {
        const user = req.session.user;

        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        const favouritePosts = await userService.getUserFavourites(user._id);
        if (favouritePosts == null) {
            res.status(404).send(`Bad GET call to ${req.originalUrl} --- no favourite posts`);
            return;
        }
        res.status(200).send(favouritePosts);

    } catch (err : any){
        res.status(500).send(err.message);
    }
})

interface UserFavouriteDeleteRequest extends SessionRequest {
    body : {
        postID : string
    }
}

/**
 * Removes a post from the session user's favourites
 */
userRouter.delete("/favourite", async (
    req : UserFavouriteDeleteRequest,
    res: Response<IPost[] | string>
) => {
    try {
        const {postID} = req.body;
        const user = req.session.user;

        if (user == null) {
            res.status(401).send("Not logged in");
            return;
        }
        const result = await userService.removeUserFavourite(user._id, postID);
        if (!result) {
            res.status(404).send(`Bad DELETE call to ${req.originalUrl} --- no favourite post to delete`);
            return;
        }
        res.status(200).send(`PostID ${postID} has been removed from ${user.username}s favourites.`);

    } catch (err : any){
        res.status(500).send(err.message);
    }
})

