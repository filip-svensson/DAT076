import {User} from "../model/User";
import {Post} from "../model/Post";
import { RecipeEntry } from "../model/RecipeEntry";
import {app} from "../start";
import { Ingredient } from "../model/Ingredient";

const session = require("supertest-session");
const request = session(app);

/**
 * Test for creating post
 * First logs in
 * Then makes title, description and recipeEntry
 * After that posts review and deletes it
 */
test("sessiontest1", async () => {

    const uName = "Person"
    const uPass = "Password123"
    const user  = new User("123", uName, uPass);

    const Title = "Drink";
    const Description = "A mixture of ingredients";
    const ingredient = new Ingredient("Alcohol");
    const recipe = new RecipeEntry(ingredient, 6,"cl");

    const Comment = "just Lovely";
    const Rating = 3;

    var recipeEntry : RecipeEntry[] = new Array<RecipeEntry>

        recipeEntry.push(recipe);

    await request.post("/user").send({
        user : user,
        username: uName,
        password: uPass
    }).expect(201);

    await request.post("/user/login").send({
        user : user,
        username: uName,
        password: uPass
    }).expect(200);

    const first = await request.post("/post").send({
        user: user,
        title: Title,
        description: Description,
        recipeEntries: recipeEntry

    }).expect(201);

    expect((first.body.title === Title)).toBeTruthy();

    const second = await request.get("/post/all").expect(200);
    expect(second.body.map((post : Post) => post.title === Title)).toBeTruthy();

    /**
     * Finds post with same title and extracts id from it
     */
    const PostID = second.body.forEach((element : Post)=> {
        if(element.title === Title){
            return element._id;
        }
    });

    await request.post("/post/review").send({
        user: user,
        postID: PostID,
        comment: Comment,
        rating: Rating

    }).expect(201);

    await request.delete("/post/review").send({
        user: user,
        postID: PostID

    }).expect(204);

});