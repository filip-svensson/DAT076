
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IReviewCard, IUser } from '../utilities/interfaces';


export default function ReviewCard({postID, userID, comment, rating, date} : IReviewCard) {

    const [author, setAuthor] = useState<string>("Not available");
    const createdDate = new Date(date).toLocaleString();

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
      
    }, [])

    return (
        <div className='border border-black rounded-2 p-2'>
            <div className='d-flex justify-content-between'>
                <Rating name="read-only" value={rating} readOnly />
            </div>
            <div className='container my-1'>{comment}</div>
            <div className="d-flex justify-content-between">
                <div>By {author}</div>
                <div>Posted: {createdDate}</div>
            </div>
        </div>
    )
}