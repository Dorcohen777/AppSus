const { useState, useEffect, useRef } = React

import { bookService } from "../services/book.service.js"
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export function BookAdd() {

    const [googleBooks, setGoogleBooks] = useState(null)
    const [bookToEdit, setBookToEdit] = useState({})
    const [searchQuery, setSearchQuery] = useState('')


    const delayedHandleBookSearch = useRef(debounce((q) => handleBookSearch(q), 500)).current

    function debounce(func, wait) {
        let timeout;

        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout)
                func(...args)
            }

            clearTimeout(timeout)
            timeout = setTimeout(later, wait)
        }
    }

    useEffect(() => {

    }, [searchQuery])

    function handleBookSearch(searchQuery) {
        bookService.getGoogleBooks(searchQuery)
            .then((res) => {
                setGoogleBooks(res.items)
            })
            .catch((err) => console.log(err))
    }

    function handleBookSearch(searchQuery) {
        bookService.getGoogleBooks(searchQuery)
            .then((res) => {
                setGoogleBooks(res.items)
            })
            .catch((err) => console.log(err))
    }


    function onAddBook(book) {
        console.log('click', book)
        const newBook = {
            authors: book.volumeInfo.authors || ["no info"],
            categories: book.volumeInfo.categories || ['no info'],
            description: book.volumeInfo.description || "no info",
            id: book.id || "noinfo",
            language: "en",
            listPrice: { amount: utilService.getRandomIntInclusive(10, 300), currencyCode: 'ILS', isOnSale: 'true' },
            pageCount: book.volumeInfo.pageCount || "no info",
            publishedDate: book.volumeInfo.publishedDate || "no info",
            subtitle: book.volumeInfo.description || "no subtitle",
            thumbnail: book.volumeInfo.imageLinks.thumbnail || 'assets/img/book-images/default.png',
            title: book.volumeInfo.title || ""
        }

        console.log('New Book', newBook)

        storageService.post('bookDB', newBook)
            .then(() => console.log('New google book added'))
            .catch((err) => console.log(err))

    }

    console.log('googlebooks', googleBooks)
    return (
            <section>
                <h1>Add new book from google library </h1>

                <input type="search" value={searchQuery} onChange={(e) => {
                    setSearchQuery(e.target.value);
                    delayedHandleBookSearch(e.target.value);
                }} />

                {googleBooks ? (
                    <ul>
                        {googleBooks.map((book) => (
                            <li key={book.id}>
                                {book.volumeInfo.title}
                                <button onClick={() => onAddBook(book)}>+</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Search book</p>
                )}
            </section>
    )

}