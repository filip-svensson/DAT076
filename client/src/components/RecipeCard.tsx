import { NavLink } from "react-router-dom";
import { Card, Ratio } from "react-bootstrap";

type recipeCard = {
  name : string,
  link : string,
  image ?: string,
  desc : string,
  amount : number
}

export default function RecipeCard({name, link, image, desc, amount} : recipeCard) {
  return (
    <NavLink to={link} >
      <Card 
        bg="light"
        text="dark"
        className="mb-2"
        style={{ width: '8rem'}}
      >
        <Card.Img variant="top" src={image ? require(image) : require("../assets/cocktail.png")} alt="card image" style={{width:"100%"}}/>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {desc}
          </Card.Text>
        </Card.Body>
      </Card>
    </NavLink>
    )
  }
  /**
   * 
   * <NavLink to={`forum/${link}`} className="card">
      <img className="card-img-top" alt="Drink Image"/>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Some drink description {amount}</p>
      </div>
    </NavLink>
   * 
   */