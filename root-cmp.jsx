const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"

import { MailIndex } from "./apps/mail/views/mail-index.jsx"
import { MailMainDetails } from "./apps/mail/views/mail-main-details.jsx"
import { MailMainInbox } from "./apps/mail/views/mail-main-inbox.jsx"
import { MailMainStarred } from "./apps/mail/views/mail-main-starred.jsx"
import { MailMainAll } from "./apps/mail/views/mail-main-archive.jsx"
import { MailMainSent } from "./apps/mail/views/mail-main-sent.jsx"
import { MailMainDraft } from "./apps/mail/views/mail-main-draft.jsx"
import { MailMainTrash } from "./apps/mail/views/mail-main-trash.jsx"

import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"



// import { BookHeader } from "./apps/book/cmps/book-header.jsx"
import { BookHome } from "./apps/book/views/book-home.jsx"
import { BookIndex } from "./apps/book/views/book-index.jsx"
import { BookAbout } from "./apps/book/views/Book-about.jsx"
import { BookVision } from "./apps/book/cmps/book-vision.jsx"
import { BookTeam } from "./apps/book/cmps/book-team.jsx"
import { BookDetails } from "./apps/book/views/book-details.jsx"
import { BookEdit } from './apps/book/views/book-edit.jsx'
import { BookAdd } from "./apps/book/views/book-add.jsx"
import { BookMainIndex } from "./apps/book/views/book-main-index.jsx"



export function App() {


    return <Router>
        <section className="app main-layout">
            <AppHeader />
            {/* <BookHeader /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/inbox" element={<MailMainInbox />} />
                    <Route path="/mail/starred" element={<MailMainStarred />} />
                    <Route path="/mail/all" element={<MailMainAll />} />
                    <Route path="/mail/sent" element={<MailMainSent />} />
                    <Route path="/mail/draft" element={<MailMainDraft />} />
                    <Route path="/mail/trash" element={<MailMainTrash />} />
                    <Route path="/mail/details/:mailId" element={<MailMainDetails />} />
                </Route>

                <Route path="/note" element={<NoteIndex />} />

                <Route path="/book" element={<BookMainIndex />} >
                    <Route path="/book/home" element={<BookHome />} />
                    <Route path="/book/about" element={<BookAbout />} >
                        <Route path="/book/about/vision" element={<BookVision />} />
                        <Route path="/book/about/team" element={<BookTeam />} />
                    </Route>
                    <Route path="/book/books/:bookId" element={<BookDetails />} />
                    <Route path="/book/books" element={<BookIndex />} />
                    <Route path="/book/books/edit/:bookId" element={<BookEdit />} />
                    <Route path="/book/books/edit" element={<BookEdit />} />
                    <Route path="/book/google/newbook" element={<BookAdd />} />
                </Route>

            </Routes>

            <UserMsg />
        </section>
    </Router >
}
