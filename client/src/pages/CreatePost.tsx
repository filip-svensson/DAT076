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
    ({ingredient:{name:""}, amount:0, unit:""});

  async function  createPost() {
    try {
      const response = await axios.post(
        "http://localhost:8080/post",
        post
      );
      navigate("/forum");
    } catch (err: any) {
      alert(`Invalid post request: ${err.message}`);
      console.log(`Error message: ${err.message}`)
    }
  }

  function handleRemoveIngredient(index:number) {
    const updatedEntries = post.recipeEntries
    updatedEntries.splice(index,1)
    setPost(prevPost => ({...prevPost, recipeEntries: updatedEntries}))
  }
  return(
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      <Form className="container my-5 d-flex flex-column gap-2">
        <Form.Label className="text-white m-0 mt-2">Upload a picture of your drink</Form.Label>
        <Form.Control type="file" accept="image/png" onChange={e => {
          e.preventDefault();
        }}/>
        <Form.Label className="text-white m-0 mt-2">Title</Form.Label>
        <Form.Control type="text" placeholder="Title" onChange={e => {
          e.preventDefault();
          setPost(prevPost => ({...prevPost, title: e.target.value}))
        }}/>
        <Form.Label className="text-white m-0 mt-2">Description</Form.Label>
        <Form.Control as="textarea" placeholder="Description" rows = {4} onChange={e=> {
          e.preventDefault();
          setPost(prevPost => ({...prevPost, description: e.target.value}))
        }}/>
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
          <Form.Control type="text" placeholder="Ingredient" onChange={e => {
            e.preventDefault();
            setRecipeEntry(prevRecipeEntry => 
              ({...prevRecipeEntry, ingredient: {name: e.target.value}}))
          }}/>
          <Form.Control type="number" placeholder="Amount" onChange={e => {
            e.preventDefault();
            setRecipeEntry(prevRecipeEntry => 
              ({...prevRecipeEntry, amount: parseFloat(e.target.value)}))
          }}/>
          <Form.Control type="text" placeholder="Unit (e.g. cl)" onChange={e => {
            e.preventDefault();
            setRecipeEntry(prevRecipeEntry => 
              ({...prevRecipeEntry, unit: e.target.value}))
          }}/>
          <Button
            className=""
            onClick={e => {
              e.preventDefault();
              if (recipeEntry.ingredient.name === "") {
                return;
              }
              setPost(prevPost => ({...prevPost, recipeEntries: [...prevPost.recipeEntries, recipeEntry]}))
            }}
          >
            Add
          </Button>
        </Form.Group>
        <Button type="submit" className="mt-5" onClick={e => {
          e.preventDefault();
          createPost();
        }}>Create post</Button>
      </Form>
    </div>
  )
}