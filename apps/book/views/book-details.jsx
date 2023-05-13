const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { utilService } from '../../../services/util.service.js'
import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/long-txt.jsx'
import { BookReview } from './book-review.jsx'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'



export function BookDetails() {

    const [book, setBook] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const { bookId } = useParams()
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [renderTheReviews, setRenderReviews] = useState([])
    const [isReviews, setIsReviews] = useState(false)

    useEffect(() => {
        loadBook()
        loadNextBookId()
        renderReviews()
    }, [bookId, isReviews])


    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => {
                console.log('Had issues in book details', err)
                showErrorMsg('Had issues in book details')
                navigate('/book/books')
            })
    }

    function renderReviews() {
        console.log('from renderReviews', bookId)
        bookService.get(bookId)
            .then((book) => {
                console.log('renderReviews', book)
                if (book.reviews) {
                    const reviewsFromBook = book.reviews
                    setIsReviews(true)
                    setRenderReviews(reviewsFromBook)
                }
            })
            .catch(err => {
                console.log(err)
                showErrorMsg('Failed To Render Reviews')
            })
    }

    function onBack() {
        navigate('/book/books')
    }

    function getPageAmountDesc(amount) {
        if (amount > 500) return `(Serious Reading)`
        if (amount > 200) return `(Decent Reading)`
        if (amount < 100) return `(Light Reading)`
        else return ``
    }

    function getPublishedDateDesc(publishedYear) {
        const currYear = new Date().getFullYear()
        if (currYear - 10 > publishedYear) return `(Vintage)`
        return `(New)`
    }

    function getClassColorByPrice(price) {
        if (price > 150) return `expensive`
        if (price < 20) return `cheap`
        return ``
    }

    function deleteReview(idx) {
        setReviews(reviews.filter((review, index) => index !== idx));
        const loadReviews = utilService.loadFromStorage('bookDB')
        console.log(loadReviews)
        const loadBook = loadReviews.find((book) => {
            console.log(bookId)
            console.log(book.id)

            return bookId === book.id
        })
        loadBook.reviews.splice(idx, 1)
        bookService.save(loadBook)

    }

    function loadNextBookId() {
        // console.log('bookId', bookId)
        bookService.getNextBookId(bookId)
            .then(book => {
                setNextBookId(book)
                setIsReviews(false)
            })
    }


    if (!book) return <div>Loading...</div>
    return (
            <section className="book-details">

                <Link className="btnLook" to={`/book/books/${nextBookId}`}>Next Book</Link>

                <img src={`${book.thumbnail}`}></img>

                <section className="book-price">
                    <label>Price:</label>
                    <h2 className={`${getClassColorByPrice(book.listPrice.amount)}`}>
                        {book.listPrice.amount}{utilService.getCurrencySymbol(book.listPrice.currencyCode)}
                    </h2>
                </section>

                <section className="book-title">
                    <h1>Name: {book.title}</h1>
                    <h2>Subtitle: {book.subtitle}</h2>
                </section>

                <section className="book-author">
                    <label>Authors:</label>
                    <h2>{`${book.authors.join(', ')}`}</h2>
                </section>

                <section className="book-category">
                    <label>Categories:</label>
                    <h2>{`${book.categories.join(', ')}`}</h2>
                </section>

                <section className="book-description">
                    <label>Description:</label>
                    <h4><LongTxt txt={book.description} /></h4>
                </section>

                <section className="book-product-details">
                    <label>Product Details:</label>
                    <h5>
                        <article className="book-pages">
                            <label>Pages:</label>
                            {book.pageCount}
                            <span>{`${getPageAmountDesc(book.pageCount)}`}</span>
                        </article>
                        <article className="book-published-date">
                            <label>Published Date:</label>
                            {book.publishedDate}
                            <span>{`${getPublishedDateDesc(book.publishedDate)}`}</span>
                        </article>
                        <article className="book-is-on-sale">
                            <label>On Sale:</label>
                            {book.listPrice.isOnSale ? `On Sale` : `Out Of Stock`}
                        </article>
                    </h5>
                    <button onClick={onBack}>Back</button>
                </section>

                <section>
                    <BookReview bookId={bookId} reviews={reviews} setReviews={setReviews} />
                </section>

                <section className='reviews-submit'>
                    <ul>
                        {reviews.map((review, idx) => (
                            <li key={idx}>
                                {review.name} gave this book a rating of {review.rate} on {review.date}.
                                <button onClick={() => deleteReview(idx)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className='section-reviews'>
                    {isReviews === true && renderTheReviews.map((review, idx) => {
                        return (
                            <ul key={idx}>
                                <li >
                                    {review.name} gave this book a rating of {review.rate} on {review.date}

                                </li>
                            </ul>
                        )
                    })}
                </section>

            </section>
    )
}