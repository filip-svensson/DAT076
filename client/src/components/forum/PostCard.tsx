import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import { IPost } from "../../utilities/interfaces";
import { NavLink } from "react-router-dom";

export default function PostCard({id, author, title, ratings} : IPost) {
  const [authorName, setAuthorName] = useState<String>();
  async function getAuthorUsername() {
    try {
      const response = await axios.get<string>(`http://localhost:8080/user/username/${author}`);
      if (response.status !== 200) return;
      setAuthorName(response.data);
    } catch (err: any) {
      console.log(err.message);
    } 
  }

  useEffect(() => {
    getAuthorUsername();
  }, [])
  return (
    <NavLink to={`/forum/post/${id}`} className="text-decoration-none text-black">
      <Card className="p-0 bg-warning">
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