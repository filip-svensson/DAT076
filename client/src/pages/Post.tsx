import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, ListGroup, Button, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";


import Rating from '@mui/material/Rating';
import Navbar from "../components/Navbar";
import ReviewCard from "../components/ReviewCard";
import { IPost } from "../utilities/interfaces";


export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  const [authorName, setAuthorName] = useState<string>();
  const [newComment, setNewComment] = useState<string>("");
  const [rating, setRating] = useState<number | null>();
  const [user, setUser] = useState();
  const [hasReviewed, setHasReviewed] = useState<boolean>();


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
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      checkIfReviewed();
    }
    
  
  }, []);
  useEffect(() => {
    getAuthorName();
  }, [post]);
  

  async function trySubmit(){
    try {
      const review = {postID: id, comment : newComment, rating : rating};
      const response = await axios.post(
        "http://localhost:8080/post/review",
          review
      );
      getPost();
    } catch (error : any) {
      console.log(error.message);
    }
  }

  async function checkIfReviewed(){
    try { 
      const response = await axios.get("http://localhost:8080/post/review",
      {
        headers: {
          postid : id
      }
      });
      setHasReviewed(response.data);
    } catch (err : any){
      console.log(err.message);
    }    
  }

  function averageReviews() : number | undefined{
    const sum = post?.reviews.map(review => review.rating).reduce((sum, rating) => sum + rating);
    if(sum && post?.reviews.length){
      return sum / post.reviews.length;
    }
    return 0;
  }
 
  var totalReviews : string = `${post?.reviews.length} reviews`;
  if(post?.reviews.length == 0){
    totalReviews = "No reviews";
  } else if (post?.reviews.length == 1){
    totalReviews = "1 review";
  }


  function typeOfCard() {
    if(user != undefined && hasReviewed){
      return (
        <Card>
          <Card.Title>Your review:</Card.Title>
          {}
        </Card>
      )
    }

  }
  

  return (
    <div className="bg-static-gradient d-flex flex-column gap-2" style={{minHeight:"100vh"}}>
      <Navbar/>
      <Container>
        <Card className="my-5" style={{minHeight:"50vh"}}>
          <Card.Img/>
          <Card.Body>
            <div className="d-flex align-items-center">
            <Card.Title>{post?.title}</Card.Title>
            <Rating className="mx-2" name="avgRating" value={averageReviews()} precision={0.1} readOnly/>
            ({totalReviews})
            </div>
            
            <Card.Subtitle className="mb-3">{`Written by ${authorName}`}</Card.Subtitle>
            <Card.Text>{post?.description}</Card.Text>
            <ListGroup variant="list-group-flush">
              {
                post?.recipeEntries.map((postEntry, index) => {
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
      <Container>
        <Card>
        
        <Form 
          onSubmit={ async (e) => {
            e.preventDefault();
            if (rating == null) {alert("Rating required."); return;}
            trySubmit();
          }}
          className="container my-1 d-flex flex-column gap-2"
        >
          <Form.Label className="my-auto">Leave a review:</Form.Label>
          <Rating 
            name="simple-controlled" 
            className="align-self-start"
            value={undefined}
            precision={1}
            onChange={(e, newRating) => {
              setRating(newRating);
            }}
          />
          <Form.Control as="textarea" placeholder="Comment... (Optional)" rows = {2} onChange={e=> {
          e.preventDefault();
          setNewComment(e.target.value);
        }}/>
  
        <Button 
          className="align-self-end"
          type="submit"
        >
          Submit
        </Button>
        
        </Form>

         
        </Card>
      </Container>
      <Container className="my-2">
        <Card>
        <Card.Title className="p-2 my-auto">Reviews ({post?.reviews.length})</Card.Title>
        {
          post?.reviews.length === 0 ?
          <Card.Text className="pb-2 mx-auto">This post has no reviews.</Card.Text>
          :
          <div className="p-2 d-flex flex-column gap-2">
            {post?.reviews.map((review) => (
              <ReviewCard 
                key={review.userID}
                postID={post?.id}
                userID={review.userID}
                comment={review.comment}
                rating={review.rating}
                date={review.date}
              />
            ))}
          </div>
        }
        </Card>
      </Container>

    </div>
  )
}