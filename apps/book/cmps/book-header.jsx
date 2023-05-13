const { Link, NavLink } = ReactRouterDOM


export function BookHeader() {

    return (
        <header className="app-header">
            <h1>Miss Books App</h1>
            <nav className="app-nav">
                <NavLink to="/book/home">Home</NavLink>
                <NavLink to="/book/about">About</NavLink>
                <NavLink to="/book/books">Our Books</NavLink>
                <NavLink to="/book/books/edit">New Book</NavLink>
                <NavLink to="/book/google/newbook">Add google book</NavLink>
            </nav>
        </header>
    )
}