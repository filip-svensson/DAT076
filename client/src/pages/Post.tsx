import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IPost, IUser, IRecipeEntry } from "../utilities/interfaces";
import BadURL from "./BadURL";


export default function Post() {
  const { id } = useParams();
  const [user, setUser] = useState<IUser>();
  const [post, setPost] = useState<IPost>();

  async function getPost() {
    try {
      const response = await axios.get(`http://localhost:8080/post/${id}`)
      setPost(response.data)
    } catch (err: any) {
      console.log(`Error message: ${err.message}`)
    }
  }
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    getPost();
  }, []);
  if (post == null) {    // If post doesn't exist
    return (
      <BadURL/>
    )
  }
  return (
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      <Container>
        <Card className="mt-5" style={{minHeight:"50vh"}}>
          <Card.Img/>
          <Card.Body>
            <Card.Title>{post?.title}</Card.Title>
            <Card.Subtitle>{`Written by ${post.author.name}`}</Card.Subtitle>
            <Card.Text>{post?.description}</Card.Text>
            <ListGroup variant="list-group-flush">
              {
                post.recipeEntries.map((postEntry, index) => {
                  return (
                    <ListGroup.Item key={index}>{`${postEntry.ingredient.name} --- ${postEntry.amount} ${postEntry.unit}`}</ListGroup.Item>
                  )
                })
              }
            </ListGroup>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}