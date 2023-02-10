
import {makePostService} from "./Post";
import {RecipeEntries} from "../model/RecipeEntries"
import {Ingredient} from "../model/Ingredient";

test("If a post is created it should be added to the list of posts", async () => {

    //Setup, create post attributes
    const author : number = 12345;
    const title : string = "Test post";
    const desc : string = "This is a delicious test post.";
    const ingredient : Ingredient = new Ingredient("Rom");
    const recipe : RecipeEntries[] = [];
    recipe.push(new RecipeEntries(ingredient, "5cl"));

    //Add post and then retrieve all posts and find the newly added
    const postService = makePostService();
    await postService.newPost(author, title, desc, recipe);
    const posts = await postService.getAllPosts();
    expect(posts.some((post) => post.desc === desc)).toBeTruthy();

})

