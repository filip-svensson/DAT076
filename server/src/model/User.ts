import { Post } from "./Post";

export interface IUser {
    id: string;
    username: string;
    password: string;
    favouritePosts: Post[];
}

export class User implements IUser {
    id: string;
    username: string;
    password: string;
    favouritePosts: Post[];

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.favouritePosts = [];
    }
    /**
     * Adds a favorite post to User
     * @param newPost new favorite post
     */
    addFavoritePost(newPost : Post) {
        this.favouritePosts.push(newPost);
    }
    /**
     * Removes a favorite post from User
     * @param postID ID of post to be remove
     */
    removeFavoritePost(postID : string) {
        this.favouritePosts = this.favouritePosts.filter(post => post.id !== postID)
    }
}