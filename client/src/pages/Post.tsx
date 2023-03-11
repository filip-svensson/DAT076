import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, ListGroup, Button, Form, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart} from "react-icons/ai"


import Rating from '@mui/material/Rating';
import Navbar from "../components/Navbar";
import ReviewCard from "../components/ReviewCard";
import { IPost , IUser} from "../utilities/interfaces";


export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  const [authorName, setAuthorName] = useState<string>();
  const [newComment, setNewComment] = useState<string>("");
  const [rating, setRating] = useState<number | null>();
  const [user, setUser] = useState<IUser>();

  console.log("--- CONSOLE LOG IN POST ---");
  console.log(user);

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

  async function deleteReview() {
    try {
      await axios.delete("http://localhost:8080/post/review", {data : {postID : post?._id}});
    } catch (err : any){
      console.log(err.message);
    }
  }


  function averageReviews() : number | undefined{
    if(post?.reviews.length === 0 || post == null) {return 0};
    const sum = post?.reviews.map(review => review.rating).reduce((sum, rating) => sum + rating);
    return sum / post.reviews.length;
  }
 
  var totalReviews : string = `${post?.reviews.length} reviews`;
  if(post?.reviews.length == 0){
    totalReviews = "No reviews";
  } else if (post?.reviews.length == 1){
    totalReviews = "1 review";
  }

  
  function typeOfCard() {
    const hasReviewed = post?.reviews.find(review => review.userID === user?._id);
    if(user == null) {  // Not signed in
      return (
        <Card className="p-2">
          <Card.Title className="mx-auto">Sign in to leave a review.</Card.Title>
        </Card>
      )
    } 
    if (hasReviewed) {  // Signed in and has reviewed the post already
      return (
        <Card className="p-2">
          <Card.Title>Your review:</Card.Title>
            <ReviewCard 
              userID={hasReviewed.userID}
              comment={hasReviewed.comment}
              rating={hasReviewed.rating}
              date={hasReviewed.date}
            />
            <Form onSubmit={deleteReview}>
              <Button type="submit" className="btn btn-danger align-self-end mt-2">
                DELETE
              </Button>
            </Form>

            
        </Card>
      )
    } 
    return (  // Signed in and has not reviewed yet
      <Card>
          <Form 
            className="container my-1 d-flex flex-column gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (rating == null) {alert("Rating required."); return;}
              trySubmit();
            }}
          >
            <Form.Label className="my-auto">Leave a review:</Form.Label>
            <Rating 
              name="simple-controlled" 
              className="align-self-start"
              value={undefined}
              precision={1}
              onChange={(e, newRating) => {
                e.preventDefault();
                setRating(newRating);
              }}
              />
              <Form.Control as="textarea" placeholder="Comment... (Optional)" rows = {2} onChange={e=> {
              e.preventDefault();
              setNewComment(e.target.value);
            }}/>
            <Button className="align-self-end" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
    )
  }
  async function addFavourite() {
    if (post == null) return;
    try {
      const response = await axios.post(
        "http://localhost:8080/user/favourite",
        {postID: post._id}
      )
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async function removeFavourite() {
    try {
      const response = await axios.get(
        "http://localhost:8080/user/favourite"
      )
      console.log(response.data)
    } catch (error: any) {
      console.log(error.message);
    }
  }

  return (
    <div className="bg-static-gradient d-flex flex-column gap-2" style={{minHeight:"100vh"}}>
      <Navbar/>
      <Container>
        <Card className="my-5" style={{minHeight:"50vh"}}>
          <Card.Img/>
          <Card.Body>
            <div className="d-flex align-items-center justify-content-start">
              <Card.Title>{post?.title}</Card.Title>
              <Rating className="mx-2" name="avgRating" value={averageReviews()} precision={0.1} readOnly/>
              <span>({totalReviews})</span>
              { <div className="ms-auto">
                {/* {user?.favouritePosts.find(favouritePost => favouritePost._id === post?._id) */ true ? 
                  <button onClick={ async (e) => {
                    e.preventDefault();
                    removeFavourite();
                  }}>Favourite</button>
                  :
                  <button onClick={ async (e) => {
                    e.preventDefault();
                    addFavourite();
                  }}>Not Favourite</button>
                }
              </div> }
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
      <Container className="p-2">
        {
          typeOfCard()
        }
      </Container>
      <Container className="my-2">
        <Card>
        <Card.Title className="p-2 my-auto">Reviews ({post?.reviews.length})</Card.Title>
        {
          post?.reviews.length === 0 ?
          <Card.Text className="pb-2 mx-auto">This post has no reviews.</Card.Text>
          :
          <div className="p-2 d-flex flex-column gap-2">
            {post?.reviews.filter(review => review.userID !== user?._id).map((review) => ( // remove '.filter(review => review.userID !== user?.id)' to show your card next all of them
              <ReviewCard 
                key={review.userID}
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