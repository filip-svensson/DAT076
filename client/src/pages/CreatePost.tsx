import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import { IRecipeEntry, IIngredient, IPost, ITempPost } from "../utilities/interfaces";
export default function CreatePost() {
const navigate = useNavigate();


const [post, setPost] = useState<ITempPost[]>();  
const [recipe, setRecipe] = useState<IRecipeEntry[]>([]);

  function addHandler() {
    const adder : IRecipeEntry[] = [...recipe, 
      {
      ingredient: { name: ""},
      amount: "0",
      unit: "cl"
    }]
    setRecipe(adder);
  }
  
  function changeHandler(){ //Could do without as we dont upload until buttonpress

  } 

  function removeHandler(index: number){
    const list = [...recipe];
    list.splice(index, 1);
    setRecipe(list)
  }

  async function createHandler(){
    const create = await axios.post<ITempPost[]>("http://localhost:8080/post/", {
    title : post{title},
    description : post{description},
    recipeEntries : recipe
    });

    try{if (create.status !== 201) return;
      navigate("/forum");
    } catch (err: any) {
      console.log(`Error message: ${err.message}`)
    }
  }
  
  return(
      <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
        <Navbar/>
        <div className="container d-flex justify-content-center align-items-center flex-fill">  
    
        <Form className="d-flex flex-column gap-2"> 
              <Form.Control type="file" style={{minWidth:"100vh", minHeight:"30vh"}}></Form.Control> 
                            <Form.Label className="fw-bold text-color-orange">Add a picture of your nice drink above!</Form.Label>
             
                <Form.Control type="text" placeholder="Name of your Drink!" style={{maxWidth:"13rem"}} aria-label="Name of your drink!" onChange={e => {
          e.preventDefault();
          setPost({...post, title : e.target.value});
        }}></Form.Control>
                <Form.Control type="text" placeholder="Description" style={{ minHeight:"4rem"}} aria-label="Description"></Form.Control>
           
              {recipe.map((addIngredient, index) => (
              <Form className="form-group row" key={index}>
                <div className="col-sm-6">  
                  <input type="string" className="form-control" placeholder="Ingredient"
               /**onChange= yadda yadda     */></input>
                </div>
                <div className="col-sm-3">
                  <input type="number" className="form-control" placeholder="Amount"
               /**onChange= yadda yadda     */></input>
                </div>
                <div className="col-sm-2">
                  <input type="string" className="form-control" placeholder="Unit"
              /**onChange= yadda yadda     */></input>
                </div> 
                <Button className="col-sm-1" variant="danger" onClick={() => removeHandler(index)}>X</Button>
              </Form>
              ))}
            <Button variant="outline-dark" onClick={addHandler}>Add Ingredient</Button>
  
            <Button variant="outline-light" onClick={createHandler}>Post your drink!</Button>
          </Form>
        </div>
      </div>
    )
    }

