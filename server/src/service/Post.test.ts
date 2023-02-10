
import {makePostService} from "./Post";

test("If a post is created it should be added to the list of posts", async () => {
    const author : number = 12345;
    const title : string = "Test post";
    const desc : string = "This is a delicious test post.";

    const postService = makePostService();
    postService.newPost(
        author,
        title,
        desc,
        [
            {}
        ]
    )

})

/*
import { makeTaskService } from "./task"

test("If a task is added to the list then it should be in the list", async () => {
    const desc = "Test description";
    const taskService = makeTaskService();
    await taskService.addTask(desc);
    const tasks = await taskService.getTasks();
    expect(tasks.some((task) => task.description === desc)).toBeTruthy();
})
 */