import { postModel } from '../../db/Post.db';
import { userModel } from '../../db/User.db';
import { IPost } from '../model/Post';
import { IUser } from "../model/User";

export interface IUserService {
    createUser(username: string, password: string, id ?: string): Promise<boolean>;
    findUser(username: string, password: string): Promise<IUser | null>;
    findUsername(id: string): Promise<string | undefined>;
    addUserFavourite(userID : string, postID : string): Promise<boolean>;
    getUserFavourites(userID : string): Promise<IPost[] | null>;
    removeUserFavourite(userID : string, postID : string) : Promise<boolean> ;
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
        await userModel.create({
            username : username,
            password : password,
            favouritePosts : [],
        }, function(err : any){
            if(err){return false;}
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
        const user : IUser | null = await userModel.findOne({username:username, password:password});
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
     * Adds a new favourite post to the user with the given ID
     * @param userID the id of the user
     * @param postID the ID of the post
     * @returns true if a new favourite was added, false if nothing was changed
     */
    async addUserFavourite(userID : string, postID : string): Promise<boolean> {
        const response = await userModel.updateOne({_id: userID}, {$addToSet : {favouritePosts : postID}});
        if (response.modifiedCount === 0) return false;
        return true;
    }

    /**
     * Gets the favourite posts of the user with the given ID
     * @param userID the id of the user
     * @returns a list of Posts
     */
    async getUserFavourites(userID : string): Promise<IPost[] | null> {
        const favourites = await userModel.findById(userID, "favouritePosts");
        const favouritePosts : IPost[] | null = await postModel.find({_id : { $in : favourites?.favouritePosts}});
        return favouritePosts;
    }

    /**
     * Removes a favourite with post ID from the user's favourite posts
     * @param userID the ID of the user
     * @param postID the ID of the post
     * @returns true if a favourite post was removed from the user, false if nothing was changed
     */
    async removeUserFavourite(userID : string, postID : string) : Promise<boolean> {
        const response = await userModel.updateOne({_id: userID}, {$pull: {favouritePosts: postID}});
        if(response.modifiedCount === 0) return false;
        return true;
        
    }
}

export function makeUserService(): UserService {
    return new UserService();
}