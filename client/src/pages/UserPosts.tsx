
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import {IPost, IUser} from '../utilities/interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';



export default function UserPosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser>();
  async function fetchPosts() {
    if (user == null) return; // maybe do something else here
    try {
      const response = await axios.get<IPost[]>(`http://localhost:8080/post/all/user/${user._id}`); 
      setPosts(response.data);
      console.log(response.data);
    } catch (err: any) {
      console.log(`Did you start the server? error message: ${err.message}`);
    }
  }
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [])
  useEffect(() => {
    fetchPosts();
  }, [user])
  return (
    <div className="bg-static-gradient" style={{minHeight:"100vh"}}>
      <Navbar/>
      <div className="w-75 gap-2 my-4">
        <div className="row row-cols-3 row-cols-lg-5 g-2 justify-content-center">
          {posts.map(({_id, author, title, description, recipeEntries, reviews}) => (
            <div className="col-4" key={_id}>
              <PostCard
                _id={_id}
                author={author}
                title={title}
                description={description}
                recipeEntries={recipeEntries}
                reviews={reviews}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}