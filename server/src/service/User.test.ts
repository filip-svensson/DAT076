import { makeUserService} from "./User";

/**
 * Uses createUser to see if it can make and store the user.
 * Finds User with uName and uPass to see if user created is the one newly created.
 */
test("Testing to create User", async()=>{
    const uName = "Greg";
    const uPass = "AlsoGreg";

    const testService = makeUserService();
    await testService.createUser(uName, uPass, "test");

    const newUser = await testService.findUser(uName, uPass);

    expect(newUser?.username).toBe(uName);
    expect(newUser?.password).toBe(uPass);
})
/**
 * Tries to tie user to ID and find through that, rather than username and password
 */
test("Testing User with ID", async() => {
    const wrong = "impostor";
    const uName = "bob";
    const uPass = "bobrulez";

    const testService = makeUserService();
    await testService.createUser(uName,uPass, "test");
    const findID = await testService.findUser(uName, uPass);
    const id = findID?._id;

    console.log(id);

    if(id != null){
        const newUser = await testService.findUsername(id?.toString());


        expect(newUser === uName).toBeTruthy();
        expect(newUser === wrong).toBeFalsy();}

})