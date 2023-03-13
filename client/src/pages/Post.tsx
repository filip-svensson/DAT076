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
  const [userFavourites, setUserFavourites] = useState<IPost[]>([]);

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

  async function getUserFavourites(){
    if(post == null) return;
    try {
      const posts = await axios.get("http://localhost:8080/user/favourite");
      setUserFavourites(posts.data);
    } catch (err: any) {
      console.log(`Did you start the server? error message: ${err.message}`);
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
    getUserFavourites();
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


  function averageReviews() : number | undefined {
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

  async function addFavourite() {
    if (post == null) return;
    try {
      const response = await axios.post(
        "http://localhost:8080/user/favourite",
        {postID: id}
      );
      getUserFavourites();
    } catch (error: any) {
      console.log(error.message);
    }
  }
  async function removeFavourite() {
    try {
      const response = await axios.delete(
        "http://localhost:8080/user/favourite",
        {data : {postID : id}}
      );
      getUserFavourites();
    } catch (error: any) {
      console.log(error.message);
    }
  }
  function typeOfCard() { // Card for comment section
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
                
                { user ? //Is the post viewed by a signed in user? If not, just show empty div
                    userFavourites?.find(favourite => favourite._id === post?._id) ? //If so, check wether this is one of their favourites or not
                      <button className="border-0 bg-transparent shadow-none" onClick= {(e) => {
                        e.preventDefault();
                        removeFavourite();
                      }}>
                      <span className="p-2">Remove from favourites</span>
                      <AiFillHeart color="red" size="40"/>
                      </button>
                    :
                      <button className="border-0 bg-transparent shadow-none" onClick= {(e) => {
                        e.preventDefault();
                        addFavourite();
                      }}>
                      <span className="p-2">Add to favourites</span>
                      <AiOutlineHeart color="red" size="40"/>
                    </button>
                  : <div/>
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