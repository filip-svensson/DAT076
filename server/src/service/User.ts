import { ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { postModel } from '../../db/Post.db';
import { userModel } from '../../db/User.db';
import { IPost } from '../model/Post';

import { IUser, User } from "../model/User";

export interface IUserService {
    createUser(username: string, password: string, id ?: string): Promise<boolean>;
    findUser(username: string, password: string): Promise<IUser | null>;
    findUsername(id: string): Promise<string | undefined>;
    addUserFavourites(userID : string, postID : string): Promise<boolean>
}


class UserService implements IUserService {
    
    /**
     * Creates a new user
     * @param username username of user
     * @param password password of user
     * @returns true if user created successfully | false if something went wrong (user already exist)
     */
    async createUser(username: string, password: string, ID : string | undefined): Promise<boolean> {
        const exists = await userModel.findOne({username : username});
        if(exists){
            return false;
        }
        
        const res = await userModel.create({
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
        const user : IUser | null = await userModel.findOne({_id:id});
        return user?.username;
    }

    /**
     * Adds a new favourite post to the user
     * @param user user of the new favourite to add to
     * @param postID ID of the post being added to favourites of user
     * @returns true if a new favourite was added, false if nothing was changed
     */
    async addUserFavourites(userID : string, postID : string): Promise<boolean> {
        const response = await userModel.updateOne({_id: userID}, {$addToSet : {favouritePosts : postID}});
        if (response.modifiedCount === 0) return false;
        return true;
    }

    async getUserFavourites(userID : string): Promise<IPost[] | null> {
        const favourites = await userModel.findById(userID, "favouritePosts");
        const favouritePosts : IPost[] | null = await postModel.findById(favourites);
        return favouritePosts;
    }
   

}

export function makeUserService(): UserService {
    return new UserService();
}