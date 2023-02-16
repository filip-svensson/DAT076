import { NavLink } from "react-router-dom";
import { Card, Ratio } from "react-bootstrap";

type recipeCard = {
  key : number,
  name : string,
  link : number,
  image ?: string,
  desc : string,

}

export default function RecipeCard({name, link, image} : recipeCard) {
  return (
    <NavLink to={`/forum/${link}`} >
      <Card 
        bg="light"
        text="dark"
        className="mb-2"
        style={{ width: '8rem'}}
      >
        <Card.Img className="p-2" variant="top" src={image ? require(image) : require("../assets/cocktail.png")} alt="card image" style={{width:"100%"}}/>
        <Card.Body>
          <Card.Title style={{textDecoration:"none"}}>{name}</Card.Title>
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