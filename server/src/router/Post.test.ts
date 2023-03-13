import * as SuperTest from "supertest";
import { postRouter } from "./Post";
import {Post} from "../model/Post";
import { RecipeEntry } from "../model/RecipeEntry";


const request = SuperTest.default(postRouter);

/**
 * Test for postRouter.
 * Makes title, description and recipeEntry
 */
test("Post/Get Recipes - Test", async () => {
const Title = "Drink";
const Description = "A mixture of ingredients";
const RecipeEntry : RecipeEntry = {
 ingredient : {name : "Alcohol"},
 amount : 6,
 unit : "cl"
}
var recipes : RecipeEntry[] = new Array();
recipes.push(RecipeEntry);

const first = await request.post("/").send({
    body: {
    title: Title,
    description: Description,
    recipeEntry: recipes}
});

expect(first.statusCode).toEqual(201);
expect((first.body.recipeEntries === recipes)).toBeTruthy();
const second = await request.get("/all");
expect(second.statusCode).toEqual(200);
expect((second.body.map((post : Post) => post.recipeEntries)).toContain(recipes));

})