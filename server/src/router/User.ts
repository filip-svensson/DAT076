import express, {Request, Response} from "express";
import { makeUserService } from "../service/User";

import { IUser } from "../model/User";
import { IPost } from "../model/Post";


const userService = makeUserService();
export const userRouter = express.Router();



type UserRequest = Request & {
    body: {
        username: string,
        password: string
    }
    session: {
        user ?: IUser
    }
}
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
            res.status(400).send(`Bad POST passwordcall to ${req.originalUrl} --- password has type ${typeof(password)}`)
            return;
        }
        // TODO: Requirements for username and password (length, characters, etc..)
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

type UserRequestLogout = Request & {
    session: {
        user ?: IUser
    }
}

userRouter.post("/logout", async (
    req: UserRequestLogout,
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

type UserFavoritePostRequest = Request & {
    body: {
        postID : string
    }
    session: {
        user ?: IUser
    }
}

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


type UserFavoriteGetRequest = Request & {
    session: {
        user ?: IUser
    }
}
userRouter.get("/favourite", async (
    req : UserFavoriteGetRequest,
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

type UserFavouriteDeleteRequest = Request & {
    body : {
        postID : string
    }
    session: {
        user ?: IUser
    }
}

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

