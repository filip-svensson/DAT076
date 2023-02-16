import {NavLink, useParams} from "react-router-dom";
import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";


interface Ingredient {
    _name : string,
}

interface RecipeEntries {
    _ingredient : Ingredient,
    _amount : string,
}

interface Post {
    _id : number,
    _author : number,
    _image ?: string,
    _title : string,
    _desc : string,
    _recipeEntries : RecipeEntries[],
}

export default function Post() {

    const {id} = useParams()
    const [post, setPost] = useState<Post>({_author: 0, _desc: "", _id: 0, _image: "", _recipeEntries: [], _title: ""});

    async function updatePost() {
        // TODO Make it possible to change URL
        const response = await axios.get<Post>(`http://localhost:8080/Post/${id}`);
        setPost(response.data);
    }

    useEffect(() => {
        updatePost();
    }, []);

    return (
        <div className="bgStatic d-flex flex-column">
            <div className="d-flex px-3 pt-3">
                <NavLink className="button" to="/forum">
                    Return
                </NavLink>
            </div>
            <Card className="align-self-center" style={{width: "50%"}}>
                <Card.Img className="p-2" variant="top" src={post._image ? require(post._image) : require("../assets/cocktail.png")} alt="card image" style={{width:"100%"}}/>
                <Card.Body>
                    <Card.Title>{post._title}</Card.Title>

                    <Card.Text>
                       Description: {post._desc}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}



function RecipeEntry (props : {name : string, amount : string}){
    return (
        <li>
            {props.name} - {props.amount}
        </li>
    )
}