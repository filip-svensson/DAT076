import * as SuperTest from "supertest";
import {User} from "../model/User";
import { v4 as uuidv4 } from 'uuid';
import {app} from "../start";

const request = SuperTest.default(app);
const session = require("supertest-session");

const testSession = session(app);

const uName = "apa16"
const uPass = "bobbyspassword123"
const user  = new User("123", uName, uPass);




test("Sessiontest2", async () => {
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

    await testSession.post("/user/logout").send({
        username: uName,
        password: uPass,
        user : user
    }).expect(200);



});
