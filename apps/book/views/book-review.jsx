const { useState, useEffect, useRef } = React


import { bookService } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'


export function BookReview({ bookId, reviews, setReviews }) {

    // console.log('id from review', bookId)

    const nameRef = useRef('')
    const rateRef = useRef(0)
    const dateRef = useRef(0)


    //THIS IS FIXED:
    function onSubmitReview() {
        if (!bookId) return
        const idBook = bookId
        const name = nameRef.current.value
        const rate = rateRef.current.value
        const date = dateRef.current.value
        const review = {
            idBook,
            name,
            rate,
            date,
        }
        bookService.addReview(idBook, review)
            .then(book => {
                console.log('Review added successfully')
                showSuccessMsg('Review added successfully')
                console.log('book', book)
                setReviews([...reviews, review])
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Failed to add review')
            })
    }


    return (
        <div className='div-reviews-inputs'>
            <label>name</label>
            <input type="text" ref={nameRef} />
            <label htmlFor="">Rating</label>
            <select ref={rateRef}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <label htmlFor="">Read at</label>
            <input type="date" ref={dateRef} />
            <button onClick={() => onSubmitReview()}>Submit review</button>
        </div>
    )
}