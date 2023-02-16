import {NavLink} from "react-router-dom";
import RecipeCard from "../components/RecipeCard"
import {Card, Container, Nav, Navbar} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

export interface Ingredient {
    _name : string,
}

export interface RecipeEntries {
    _ingredient : Ingredient,
    _amount : string,
}

export interface Post {
    _id : number,
    _author : number,
    _title : string,
    _desc : string,
    _recipeEntries : RecipeEntries[],
}

export default function Forum() {


    const [posts, setPosts] = useState<Post[]>([]);

    async function updatePosts() {
        // TODO Make it possible to change URL
        const response = await axios.get<Post[]>("http://localhost:8080/Post");
        setPosts(response.data);
    }

    useEffect(() => {
        updatePosts();
    }, []);


    return (
        <div className="forum bgStatic">
            <Navbar>
                <Container>
                    <Navbar.Brand href="">
                        <h1>
                            Forum
                        </h1></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href={""}>
                            <button className="button">
                                Login
                            </button>
                        </Nav.Link>
                        <Nav.Link>
                            <button className="button">
                                Register
                            </button>
                        </Nav.Link>
                        <Nav.Link>
                            <button className="button">
                                Add post
                            </button>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <NavLink to="/">Go back</NavLink>
            <div className="recipe-cards">
                {
                    posts.map(post => (
                        <RecipeCard
                            key={post._id}
                            name={post._title}
                            link={post._id}
                            desc={post._desc}
                        />
                    ))
                }
            </div>
        </div>
    )
}
