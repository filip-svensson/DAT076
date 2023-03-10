
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IReview, IUser } from '../utilities/interfaces';


export default function ReviewCard({userID, comment, rating, date} : IReview) {
    const [user, setUser] = useState<IUser>();
    const [author, setAuthor] = useState<string>("Not available");
    const createdDate = new Date(date);
    async function updateAuthor() {
        try {
            const response = await axios.get(`http://localhost:8080/user/username/${userID}`)
            setAuthor(response.data);
        } catch (err: any) {
            console.log(`Error message: ${err.message}`);
        }
    }
    useEffect(() => {
        updateAuthor();
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, [])

    return (
        <div className='border border-black rounded-2 p-2'>
            <div className='d-flex'>
                <Rating name="read-only" value={rating} readOnly />
                {user?.id === userID && <div className='mx-2'>Your Review (Delete button?)</div>}
            </div>
            <div className='container my-1'>{comment}</div><span>{`By ${author} on ${createdDate.getFullYear()} - ${createdDate.getMonth()}`}</span>
        </div>
    )
}