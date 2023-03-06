import { makeUserService} from "./User";
import { v4 as uuidv4 } from 'uuid';

/**
 * Uses createUser to see if it can make and store the user.
 * Finds User with uName and uPass to see if user created is the one newly created.
 */
test("Testing to create User", async()=>{
const uName = "Greg";
const uPass = "AlsoGreg";

const testService = makeUserService();
await testService.createUser(uName, uPass, "");

const newUser = await testService.findUser(uName, uPass);

expect(newUser?.username).toBe(uName);
expect(newUser?.password).toBe(uPass);
})
/**
 * Tries to tie user to ID and find through that, rather than uName and uPass
 */
test("Testing User with ID", async() => {
    const id = uuidv4();
    const wrong = "impostor";
    const uName = "bob";
    const uPass = "bobrulez";

    const testService = makeUserService();
    await testService.createUser(uName,uPass, "test");

    const newUser = await testService.findUsername(id);

    expect(newUser === uName).toBeTruthy();
    expect(newUser === wrong).toBeFalsy();

})
