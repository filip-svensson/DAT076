import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import { IPost } from "../utilities/interfaces";
import { NavLink } from "react-router-dom";
import Rating from '@mui/material/Rating';

export default function PostCard({_id, author, title, reviews} : IPost) {

  const [authorName, setAuthorName] = useState<string>();

  useEffect(() => {
    getAuthorName();
  }, [])

  async function getAuthorName() {
    try {
      const response = await axios.get(`http://localhost:8080/user/username/${author}`)
      setAuthorName(response.data);
    } catch (err: any) {
      console.log(`Error message: ${err.message}`);
    }
  }
  
  function averageReviews() : number | undefined{
    if(reviews.length === 0) {return 0};
    const sum = reviews.map(review => review.rating).reduce((sum, rating) => sum + rating);
    return sum / reviews.length;
  }
  
 
  return (
    <NavLink to={`/forum/post/${_id}`} className="text-decoration-none text-black">
      <Card className="p-0 bg-light">
        <Card.Img
          variant="top"
          src={true ? require("../assets/cocktail.png"):"https://placeholder.com/assets/images/150x150-2-500x500.png"}
          className="img-responsive"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className="m-0" style={{fontSize:"11pt"}}>{`Written by ${authorName}`}</Card.Text>
          <div className="d-flex flex-row">
          <Rating className="" name="avgRating" value={averageReviews()} precision={0.1} readOnly/>
          ({reviews.length})
          </div>
        </Card.Body>
      </Card>
    </NavLink>
    )
  }