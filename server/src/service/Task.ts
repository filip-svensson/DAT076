import { Post } from "../model/Post";
import {RecipeEntries} from "../model/RecipeEntries";

export interface PostInterface{

    getAllPosts() : Promise<Post[]>;

    getPost(id : number) : Promise<Post>;

    newPost(author : number, title : string, desc: string, recipeEntries : RecipeEntries[]) : Promise<Post>;

}

    class PostService implements PostInterface {

    posts : Array<Post> = [];

    async getAllPosts() : Promise<Post[]>{
        return this.posts;
    }

    async getPost(id : number) : Promise<Post>{
        return this.posts[id];
    }

    async newPost(author : number, title : string, desc : string, recipeEntries : RecipeEntries[]) : Promise<Post>{
        let newId : number;

        while(true){
            newId = Math.floor((Math.random() * 10000)+1);
            if(!this.posts.some(Post => Post.id === newId)){
                break;
            }
        }
        const post = new Post(newId, author, title, desc, recipeEntries);
        this.posts.push(post);
        return post;
    }



    }