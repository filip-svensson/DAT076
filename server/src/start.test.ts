import * as SuperTest from "supertest";
import { app } from "./start";
import { Post } from "./model/Post";
import { Ingredient } from "./model/Ingredient";
import { RecipeEntries } from "./model/RecipeEntries";

const request = SuperTest.default(app);

test("End-to-end test", async () => {

    //Setup, create post attributes
    const author : number = 12345;
    const title : string = "Test post";
    const desc : string = "This is a delicious test post.";
    const ingredient : Ingredient = new Ingredient("Rom");
    const recipe : RecipeEntries[] = [];
    recipe.push(new RecipeEntries(ingredient, "5cl"));

    //Add a new post
    const res1 = await request.post("/Post").send({author : author, title : title, desc : desc, recipeEntries : recipe});

    expect(res1.statusCode).toEqual(201);
    expect(res1.body._author).toEqual(author);
    expect(res1.body._title).toEqual(title);
    expect(res1.body._desc).toEqual(desc);
    expect(res1.body._recipeEntries).toEqual(recipe);

    //Retrieve the assigned ID
    const newPostID = res1.body._id;

    //Retrieve all posts and look for the one we added
    const res2 = await request.get(`/Post/${newPostID}`);
    expect(res2.statusCode).toEqual(200);
    expect(res2.body._id).toEqual(newPostID);
    expect(res2.body._author).toEqual(author);
    expect(res2.body._title).toEqual(title);
    expect(res2.body._desc).toEqual(desc);
    expect(res2.body._recipeEntries).toEqual(recipe);

})


/*
import * as SuperTest from "supertest";
import { app } from "./start";
import { Task } from "./model/task";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const desc = "Test description";
    const res1 = await request.post("/task").send({description : desc});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.description).toEqual(desc);
    const res2 = await request.get("/task");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((task : Task) => task.description)).toContain(desc);
});
 */