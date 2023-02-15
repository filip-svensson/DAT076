import { NavLink } from "react-router-dom";
import RecipeCard from "../components/RecipeCard"


export default function Forum() {
  const recipe_cards = [
    {
      name : "Beer",
      link : "/beer",
      desc : "This is a good drink",
      amount : 5
    },
    {
      name : "Wine",
      link : "/wine",
      desc : "This is a bad drink",
      amount : 0
    },
    {
      name : "Vodka",
      link : "/vodka",
      desc : "This is an okay drink",
      amount : 1
    },
  ]
  return (
    <div className="forum">
      <NavLink to="/">Go back</NavLink>
      <div className="recipe-cards">
        {
          recipe_cards.map(recipe => (
            <RecipeCard 
              key={recipe.name}
              name={recipe.name} 
              link={recipe.link} 
              desc={recipe.desc} 
              amount={recipe.amount}
            />
          ))
        }
      </div>
    </div>
    )
  }