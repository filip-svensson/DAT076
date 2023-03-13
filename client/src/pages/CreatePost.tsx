import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import { IRecipeEntry } from "../utilities/interfaces";

export default function CreatePost() {

  const navigate = useNavigate();

  const [post, setPost] = 
    useState<{title: string, description: string, recipeEntries: IRecipeEntry[]}>
    ({title: "", description: "", recipeEntries: []});  

  const [recipeEntry, setRecipeEntry] = 
    useState<IRecipeEntry>
    ({ingredient:{name:""}, amount:1, unit:""});
    
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [ingredientError, setIngredientError] = useState<string>("");

  
  /**
   * handles the submit of the form
   * title, description, ingredient (not input, just length of array)
   */
  async function  handleSubmit() {
    let hasError = false;
    // place all form validation here
    setTitleError("");
    setDescriptionError("");
    setIngredientError("");
    // title validation
    if (post.title.length <= 2 || 41 <= post.title.length) {
      setTitleError("Title has to be longer than 2 and shorter than 41 characters!");
      hasError = true;
    }
    // description validation
    if (post.description.length <= 15 || 501 <= post.description.length) {
      setDescriptionError("Title has to be longer than 15 and shorter than 501 characters!");
      hasError = true;
    }
    // ingredient validation
    if (post.recipeEntries.length === 0) {
      setIngredientError("There has to be at least one ingredient in your post!");
      hasError = true;
    }
    if (hasError) return;
    try {
      await axios.post(
        "http://localhost:8080/post",
        post
      );
      navigate("/forum");
    } catch (err: any) {
      alert(`Invalid post request: ${err.message}`);
      console.log(`Error message: ${err.message}`)
    }
  }


  
  /**
   * Function for handling add ingredient
   * validates the ingredient input
   */
  function handleAddIngredient() {
    let hasError = false;
    // validate for a new recipeEntry (ingredient)
    setIngredientError("");
    let nameError = "";
    let amountError = "";
    let unitError = "";
    // ingredient name validation
    if (recipeEntry.ingredient.name.length <= 1 || 41 <= recipeEntry.ingredient.name.length) {
      nameError = "Ingredient name has to be longer than 1 and shorter than 41";
      hasError = true;
    }
    // recipe entry unit validation
    if (recipeEntry.unit.length === 0) {
      unitError = "You have to include a unit!";
      hasError = true;
    }
    if (nameError && amountError) {
      setIngredientError(`${nameError} & ${amountError}`);
    } else if (nameError && unitError) {
      setIngredientError(`${nameError} & ${unitError}`);
    } else if (amountError && unitError) {
      setIngredientError(`${amountError} & ${unitError}`);
    } else if (nameError) {
      setIngredientError(nameError);
    } else if (amountError) {
      setIngredientError(amountError);
    } else if (unitError) {
      setIngredientError(unitError);
    } 
    if (hasError) return;
    setPost(prevPost => ({...prevPost, recipeEntries: [...prevPost.recipeEntries, recipeEntry]}))
  }


  /**
   * Function for handling remove ingredient
   */
  function handleRemoveIngredient(index:number) {
    const updatedEntries = post.recipeEntries
    updatedEntries.splice(index,1)
    setPost(prevPost => ({...prevPost, recipeEntries: updatedEntries}))
  }


  return(
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      <Form className="container my-5 d-flex flex-column gap-2" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <Form.Label htmlFor="title" className="text-white m-0 mt-2">Title</Form.Label>
        <Form.Control name="title" type="text" placeholder="Title" required onChange={e => {
          e.preventDefault();
          setPost(prevPost => ({...prevPost, title: e.target.value}))
        }}/>
        {titleError && <Form.Label htmlFor="title" className="fs-6 text-danger bg-white bg-opacity-75 rounded p-2">{titleError}</Form.Label>}
        <Form.Label className="text-white m-0 mt-2">Description</Form.Label>
        <Form.Control name="description" as="textarea" placeholder="Description" rows = {4} required onChange={e=> {
          e.preventDefault();
          setPost(prevPost => ({...prevPost, description: e.target.value}))
        }}/>
        {descriptionError && <Form.Label htmlFor="description" className="fs-6 text-danger bg-white bg-opacity-75 rounded p-2">{descriptionError}</Form.Label>}
        <Form.Label className="text-white m-0 mt-2">Ingredients</Form.Label>
        <ul className="d-flex flex-column gap-2">
          {post.recipeEntries.map((entry, index) => {
            const {ingredient, amount, unit} = entry;
            return (
              <li className="d-flex justify-content-between mx-5 p-1 rounded bg-white text-black" key={`${index}${ingredient.name}`}>
                <p className="align-self-center m-0 ps-3">{`${ingredient.name} - ${amount} ${unit}`}</p>
                <Button variant="danger" onClick={e => {
                  e.preventDefault();
                  handleRemoveIngredient(index);
                }}>X</Button>
              </li>
            )
          })}
        </ul>
        <Form.Group className="d-flex gap-3">
          <Form.Control id="ingredient" type="text" placeholder="Ingredient" onChange={e => {
            e.preventDefault();
            setRecipeEntry(prevRecipeEntry => 
              ({...prevRecipeEntry, ingredient: {name: e.target.value}}))
          }}/>
          <Form.Control id="amount" type="number" placeholder="Amount" min="1" onKeyDown={e => {e.preventDefault()}} onChange={e => {
            e.preventDefault();
            setRecipeEntry(prevRecipeEntry => 
              ({...prevRecipeEntry, amount: parseFloat(e.target.value)}))
          }}/>
          <Form.Control id="unit" type="text" placeholder="Unit (e.g. cl)" onChange={e => {
            e.preventDefault();
            setRecipeEntry(prevRecipeEntry => 
              ({...prevRecipeEntry, unit: e.target.value}))
          }}/>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleAddIngredient();
            }}
          >
            Add
          </Button>
        </Form.Group>
        {ingredientError && <Form.Label className="fs-6 text-danger bg-white bg-opacity-75 rounded p-2">{ingredientError}</Form.Label>}
        <Button type="submit" className="mt-5">Create post</Button>
      </Form>
    </div>
  )
}