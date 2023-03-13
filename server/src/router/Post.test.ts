import * as SuperTest from "supertest";
import {User} from "../model/User";
import {Post} from "../model/Post";
import { RecipeEntry } from "../model/RecipeEntry";
import {app} from "../start";
import { ReturnDocument } from "mongodb";
import { Ingredient } from "../model/Ingredient";

const request = SuperTest.default(app);
const session = require("supertest-session");

const testSession = session(app);

const uName = "häst13"
const uPass = "bobbyspassword123"
const user  = new User("123", uName, uPass);

/**
 * Test for postRouter.
 * Makes title, description and recipeEntry
 */
test("sessiontest1", async () => {
    const Title = "Drink";
    const Description = "A mixture of ingredients";
    const ingredient = new Ingredient("Alcohol");
    const recipe = new RecipeEntry(ingredient, 6,"cl");

    var recipeEntry : RecipeEntry[] = new Array<RecipeEntry>

        recipeEntry.push(recipe);

    console.log(recipeEntry)



    await testSession.post("/user").send({
        username: uName,
        password: uPass,
        user: user
    }).expect(201);

    await testSession.post("/user/login").send({
        username: uName,
        password: uPass,
        user : user
    }).expect(200);

    const first = await testSession.post("/post").send({
        title: Title,
        description: Description,
        recipeEntries: recipeEntry,
        user: user
    }).expect(201);

    expect((first.body.title === Title)).toBeTruthy();

    const second = await testSession.get("/post/all").expect(200);
    expect(second.body.map((post : Post) => post.title === Title)).toBeTruthy();



});
