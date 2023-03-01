import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../../db/User.db';

import { IUser, User } from "../model/User";

export interface IUserService {
    createUser(username: string, password: string): Promise<boolean>;
    findUser(username: string, password: string): Promise<IUser | null>;
}

class UserService implements IUserService {
    
    /**
     * Creates a new user
     * @param username username of user
     * @param password password of user
     * @returns true if user created successfully | false if something went wrong (user already exist)
     */
    async createUser(username: string, password: string): Promise<boolean> {
       
        
        const exists = await userModel.findOne({username : username});
        if(exists){
            return false;
        }
        
        const id = uuidv4();
        const res = await userModel.create({
            id : id,
            username : username,
            password : password,
            favouritePosts : [],
        }, function(err : any){
            if(err){return false;}
            return true;
        });
        return true;
        
    }
    /**
     * Looks for user with same username and password
     * @param username username to look for
     * @param password password to look for
     * @returns the user with the matching username and password | undefined if there is no one
     */
    async findUser(username: string, password: string): Promise<IUser | null> {
        const user : IUser | null = await userModel.findOne({username:username});
        return user;
    }
    /**
     * Looks for a user with the given id and returns its username
     * @param id id to look for
     * @returns the username of the user with the given id | indefined if there is no one
     */
    async findUsername(id: string): Promise<string | undefined> {
        const user : IUser | null = await userModel.findOne({id:id});
        return user?.username;
    }
}

export function makeUserService(): UserService {
    return new UserService();
}