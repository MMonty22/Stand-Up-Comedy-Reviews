import React, {useState, useContext} from "react";
import { UserContext } from '../Context/UserContext';
import {useParams, useNavigate} from "react-router-dom"

function ReviewEditForm() {
    const navigate = useNavigate()
    const {id} = useParams()
    const {state, dispatch} = useContext(UserContext)
    const relevantReview = state.reviews.find((review) => String(review.id) === String(id))
    const [editFormData, setEditFormData] = useState({
        comedian: relevantReview.comedian.name,
        review_text: relevantReview.review_text,
        rating: relevantReview.rating
    })

    function handleSubmit(event) {
        event.preventDefault()
        const editedReviewObj = {
            comedian: editFormData.comedian,
            review_text: editFormData.review,
            rating: editFormData.rating,
        }
        fetch(`/reviews/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedReviewObj)
        })
        .then(res => res.json())
        .then(data => updateReview(data))
        navigate("/")
    }

    function updateReview(editedReview) {
        dispatch({type: "updateReview", payload: editedReview})
    }

    function handleChange(event) {
        setEditFormData({
            ...editFormData,
            [event.target.id]: event.target.value,
        })
    }

    return(
        <div className="reviewForm">
            <h1>Please Leave a Review</h1>
            <form onSubmit={handleSubmit}>
                <label>Comedian</label>
                <br/>
                <input id="comedian" type="text" value={editFormData.comedian} readOnly></input>
                <br/>
                <label>Your Review</label>
                <br/>
                <textarea id="review" type="text" value={editFormData.review_text} onChange={handleChange}></textarea>
                <br/>
                <label>Rating out of 10</label>
                <br/>
                <input id="rating" type="number" name="rating" min={1} max={10} value={editFormData.rating} onChange={handleChange}></input>
                <br/>
                <button id="submitReviewButton" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ReviewEditForm