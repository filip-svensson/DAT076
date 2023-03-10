import { makePostService} from "./Post";
import { RecipeEntry } from "../model/RecipeEntry";

/**
 * Uses createPost to see if it can make the object.
 * Gets posts to see if object created is the one newly created.
 */
test("Testing to add recipe to a post", async()=>{
const author = "Person";
const title = "Drink";
const description = "A mixture of ingredients";
const recipeEntry : RecipeEntry = {
 ingredient : {name : "Alcohol"},
 amount : 6,
 unit : "cl"
}
var recipes : RecipeEntry[] = new Array();

recipes.push(recipeEntry);

const testService = makePostService();
await testService.createPost(author, title, description, recipes);

 const posts = await testService.getPosts();

expect(posts.some((post) => post.recipeEntries === recipes)).toBeTruthy();

})