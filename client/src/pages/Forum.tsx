import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { IPost } from "../utilities/interfaces";

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
      <br/>
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex gap-3">
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
            className="me-2"
            style={{minWidth:"15rem"}}
            aria-label="Search"
            />
          </Form>
        </div>
        <div className="container">
          <div className="row row-cols-auto">
            {posts.filter(post => {
              return searchPhrase === ""
              ? post
              : post.title.toLowerCase().includes(searchPhrase.toLowerCase());
            }).map(({id, author, title, description, recipeEntries, comments, ratings}) => (
              <div key={id}>{title}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }