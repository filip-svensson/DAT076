import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { IPost } from "../utilities/interfaces";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

export default function Forum() {

  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchPhrase, setSearchPhrase] = useState("");

  async function updatePosts() {
    try {
      const response = await axios.get<IPost[]>("http://localhost:8080/post/all");
      setPosts(response.data);
    } catch (err: any) {
      console.log(`Could not fetch posts; Did you start the server? error message: ${err.message}`);
    }
  }

  useEffect(() => {
    updatePosts();
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);
  
  return (
    <div className="bg-static-gradient" style={{minHeight:"100vh"}}>
      <Navbar/>
      <div className="d-flex flex-column align-items-center">
        <div className="d-flex gap-2 my-4">
          <Button
            variant="outline-light"
            className="fw-bolder"
            style={{minWidth:"8rem"}}
            onClick={ e=> {
              e.preventDefault();
              user ? navigate("/forum/create") : navigate("/login");
            }}
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
        <div className="w-75">
          <div className="row row-cols-3 row-cols-lg-5 g-2 justify-content-center">
            {posts.filter(post => {
              return searchPhrase === ""
              ? post
              : post.title.toLowerCase().includes(searchPhrase.toLowerCase());
            }).map(({_id, author, title, description, recipeEntries, reviews} : IPost) => (
              <div className="col-4" key={_id}>
                <PostCard
                  _id={_id}
                  author={author}
                  title={title}
                  description={description}
                  recipeEntries={recipeEntries}
                  reviews={reviews}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
  }