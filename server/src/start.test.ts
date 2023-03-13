import * as SuperTest from "supertest";
import { postRouter } from "./router/Post";
import {Post} from "./model/Post";
import {User} from "./model/User";
import { app } from "./start";
import { RecipeEntry } from "./model/RecipeEntry";
import { Ingredient } from "./model/Ingredient";
import { v4 as uuidv4 } from 'uuid';
import e from "cors";

const request = SuperTest.default(app);


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

//TESTS FOR COMMENT AND RATING TO BE MADE


/**
 * Test for userRouter.
 * Makes user, finds the user and tests login/logout.
 */
test("Make/find/login user - Test", async () => {
    const UserId = uuidv4();
    const uName = "bobbyboy"
    const uPass = "bobbyspassword123"
    
    const first = await request.post("/").send({
        body: {
            username: uName,
            password: uPass,
        }
    });
    
    expect(first.statusCode).toEqual(201);
    expect((first.body.username === uName)).toBeTruthy();
    expect((first.body.password === uPass)).toBeTruthy();
    

    const second = await request.get("/username/${UserId}");  //Unsure how to call this correctly
    expect(second.statusCode).toEqual(200);
    expect((second.body.map((user : User) => user.username)).toContain(uName));
    
    
    const third = await request.post("/login").send({
        body: {
            username: uName,
            password: uPass
        }
    })
    
    expect(third.statusCode).toEqual(200);                  //Can only see if statuscode okay. Can't see session.user
    expect(third.body.username === uName).toBeTruthy();
    expect(third.body.password === uPass).toBeTruthy();


    const fourth = await request.post("/logout").send({     //Unsure if it requires session to be send with 
    })
    
    expect(fourth.statusCode).toEqual(200);                  //Can only see if statuscode okay. Can't see session.user
    })