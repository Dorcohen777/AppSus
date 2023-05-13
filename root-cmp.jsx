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



export function App() {
    return <Router>
        <section className="app main-layout">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} >
                    <Route path="/mail/inbox" element={<MailMainInbox />} />
                    <Route path="/mail/starred" element={<MailMainStarred />} />
                    <Route path="/mail/all" element={<MailMainAll />}/>
                    <Route path="/mail/sent" element={<MailMainSent />} />
                    <Route path="/mail/draft" element={<MailMainDraft />} />
                    <Route path="/mail/trash" element={<MailMainTrash />} />
                    <Route path="/mail/details/:mailId" element={<MailMainDetails />} />
                </Route>
                <Route path="/note" element={<NoteIndex />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
