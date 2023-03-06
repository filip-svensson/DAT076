import express, {Request, Response} from "express";
import { makeUserService } from "../service/User";

import { IUser } from "../model/User";


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