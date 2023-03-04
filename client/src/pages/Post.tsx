import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IPost } from "../utilities/interfaces";
import BadURL from "./BadURL";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  const [authorName, setAuthorName] = useState<string>();

  async function getPost() {
    try {
      const response = await axios.get(`http://localhost:8080/post/${id}`)
      setPost(response.data)
    } catch (err: any) {
      console.log(`Error message: ${err.message}`);
    }
  }
  async function getAuthorName() {
    if (post == null) { setAuthorName("Unavailable"); return; }
    try {
      const response = await axios.get(`http://localhost:8080/user/username/${post.author}`)
      setAuthorName(response.data);
    } catch (err: any) {
      console.log(`Error message: ${err.message}`);
    }
  }
  useEffect(() => {
    getPost();
  }, []);
  useEffect(() => {
    getAuthorName();
  }, [post]);
  if (post == null) {    // If post doesn't exist iz no good
    return (
      <BadURL/>
    )
  }
  return (
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      <Container>
        <Card className="my-5" style={{minHeight:"50vh"}}>
          <Card.Img/>
          <Card.Body>
            <Card.Title>{post?.title}</Card.Title>
            <Card.Subtitle className="mb-3">{`Written by ${authorName}`}</Card.Subtitle>
            <Card.Text>{post?.description}</Card.Text>
            <ListGroup variant="list-group-flush">
              {
                post.recipeEntries.map((postEntry, index) => {
                  return (
                    <ListGroup.Item className="d-flex justify-content-between px-lg-4 px-md-4 px-2" key={index}>
                      <span className="px-1">{postEntry.ingredient.name}</span>
                      <span className="px-1">{`${postEntry.amount} ${postEntry.unit}`}</span>
                    </ListGroup.Item>
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