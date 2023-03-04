import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import { IPost } from "../../utilities/interfaces";
import { NavLink } from "react-router-dom";

export default function PostCard({id, author, title, ratings} : IPost) {
  const [authorName, setAuthorName] = useState<string>();
  async function getAuthorName() {
    if (id == null) { setAuthorName("Unavailable"); return; }
    try {
      const response = await axios.get(`http://localhost:8080/user/username/${author}`)
      setAuthorName(response.data);
    } catch (err: any) {
      console.log(`Error message: ${err.message}`);
    }
  }
  useEffect(() => {
    getAuthorName();
  }, [])

  return (
    <NavLink to={`/forum/post/${id}`} className="text-decoration-none text-black">
      <Card className="p-0 bg-light">
        <Card.Img
          variant="top"
          src={true ? require("../../assets/cocktail.png"):"https://placeholder.com/assets/images/150x150-2-500x500.png"}
          className="img-responsive"
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{fontSize:"11pt"}}>{`Written by ${authorName}`}</Card.Text>
        </Card.Body>
      </Card>
    </NavLink>
    )
  }