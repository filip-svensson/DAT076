import * as SuperTest from "supertest";
import {User} from "../model/User";
import {app} from "../start";

const request = SuperTest.default(app);
const session = require("supertest-session");

const testSession = session(app);

const uName = "Person"
const uPass = "password123"
const user  = new User("123", uName, uPass);

/**
 * Creates a user, Logs user in and then logs user out.
 */
test("Sessiontest2", async () => {
    await testSession.post("/user").send({
        user : user,
        username: uName,
        password: uPass
    }).expect(201);

    await testSession.post("/user/login").send({
        user : user,
        username: uName,
        password: uPass
    }).expect(200);

    await testSession.post("/user/logout").send({
        user : user
    }).expect(200);



});
