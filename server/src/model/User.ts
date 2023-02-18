import { Post } from "./Post";

export interface IUser {
    id: string;
    username: string;
    password: string;
}

export class User implements IUser {
    id: string;
    username: string;
    password: string;
    favoritePosts: Post[];

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.favoritePosts = [];
    }
    /**
     * Adds a favorite post to User
     * @param newPost new favorite post
     */
    addFavoritePost(newPost : Post) {
        this.favoritePosts.push(newPost);
    }
    /**
     * Removes a favorite post from User
     * @param postID ID of post to be remove
     */
    removeFavoritePost(postID : string) {
        this.favoritePosts = this.favoritePosts.filter(post => post.id !== postID)
    }
}