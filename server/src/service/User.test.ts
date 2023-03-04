import { makeUserService} from "./User";
import { RecipeEntry } from "../model/RecipeEntry";
import { Ingredient } from "../model/Ingredient";
import { v4 as uuidv4 } from 'uuid';

/**
 * Uses createPost to see if it can make the object.
 * Gets posts to see if object created is the one newly created.
 */
test("Testing to add recipe to a post", async()=>{
const uName = "Greg";
const uPass = "AlsoGreg";

const testService = makeUserService();
await testService.createUser(uName, uPass);

const user = await testService.findUser(uName, uPass);

expect(user?.username).toEqual(uName);
expect(user?.password).toEqual(uPass);


})
