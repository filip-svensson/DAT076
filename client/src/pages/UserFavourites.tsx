
import Navbar from '../components/Navbar';
import PostCard from '../components/PostCard';
import {IPost, IUser} from '../utilities/interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function UserFavourites() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser>({_id: "", username: "", password:"", favouritePosts :[]});

  async function fetchPosts() {
    try {
        const posts = await axios.get("http://localhost:8080/user/favourite");
        setPosts(posts.data);
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


  return (
    <div className="bg-static-gradient d-flex flex-column" style={{minHeight:"100vh"}}>
      <Navbar/>
      {posts.length === 0 ? 
          <div className='text-center p-4'>You don't have any favourite posts yet</div>
        :
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
      }
    </div>
  )
}