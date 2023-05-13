const { Outlet } = ReactRouterDOM

import { BookHeader } from "../cmps/book-header.jsx"
export function BookMainIndex() {

    return (
        <section className="miss-books">
            <BookHeader />
            <Outlet />
        </section>
    )
}