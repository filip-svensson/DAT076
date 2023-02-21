import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { IPost } from "../utilities/interfaces";
import PostCard from "../components/forum/PostCard";

export default function Forum() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  async function updatePosts() {
    try {
      const response = await axios.get<IPost[]>("http://localhost:8080/post/all");
      if (response.status !== 200) return;
      setPosts(response.data);
    } catch (err: any) {
      console.log(`Did you start the server? error message: ${err.message}`);
    }
    
  }
  useEffect(() => {
    updatePosts();
  }, []);

  return (
    <div className="bg-static-gradient" style={{minHeight:"100vh"}}>
      <Navbar/>
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex gap-2 my-4">
          <Button
            variant="outline-light"
            href="/forum/create"
            className="fw-bolder"
            style={{minWidth:"8rem"}}
            >
              Create Post
          </Button>
          <Form className="d-flex">
            <Form.Control
            type="search"
            placeholder="Search"
            onChange={e => {
              e.preventDefault();
              setSearchPhrase(e.target.value);
            }}
            style={{minWidth:"15rem"}}
            aria-label="Search"
            />
          </Form>
        </div>
        <div className="mx-5 mx-lg-auto">
          <div className="row row-cols-3 row-cols-lg-5 g-2 justify-content-center">
            {posts.filter(post => {
              return searchPhrase === ""
              ? post
              : post.title.toLowerCase().includes(searchPhrase.toLowerCase());
            }).map(({id, author, title, description, recipeEntries, comments, ratings}) => (
              <div className="col-4" key={id}>
                <PostCard
                  id={id}
                  author={author}
                  title={title}
                  description={description}
                  recipeEntries={recipeEntries}
                  comments={comments}
                  ratings={ratings}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }