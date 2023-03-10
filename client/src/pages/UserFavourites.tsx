
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import {IPost, IUser} from '../utilities/interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function UserFavourites() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser>({id: "", username: "", password:"", favouritePosts :[]});

  async function fetchPosts() {
    try {
      const response = await axios.get<IPost[]>(`TBD`); //Fkn elon musk
      setPosts(response.data);
    } catch (err: any) {
      console.log(`Did you start the server? error message: ${err.message}`);
    }
    
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      fetchPosts();
    }
  }, [])

  //TODO Implement
  return (
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      BOMBA CLAT
    </div>
  )
}