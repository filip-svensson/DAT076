import { v4 as uuidv4 } from 'uuid';

import { User } from "../model/User";

export interface IUserService {
    createUser(username: string, password: string): Promise<boolean>;
    findUser(username: string, password: string): Promise<User | undefined>;
}

class UserService implements IUserService {
    users: Array<User> = [];
    /**
     * Creates a new user
     * @param username username of user
     * @param password password of user
     * @returns true if user created successfully | false if something went wrong (user already exist)
     */
    async createUser(username: string, password: string): Promise<boolean> {
        if (this.users.some(user => user.username===username)) {
            return false;
        }
        console.log(this.users);
        const id = uuidv4();
        this.users.push(new User(id, username, password));
        return true;
    }
    /**
     * Looks for user with same username and password
     * @param username username to look for
     * @param password password to look for
     * @returns the user with the matching username and password | undefined if there is one
     */
    async findUser(username: string, password: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username 
                                    && user.password === password);
    }
}

export function makeUserService(): UserService {
    return new UserService();
}