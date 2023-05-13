import { mailService } from "../services/mail.service.js"
import { MailAdd } from "../cmps/mail-add.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailNavSideBar } from "../cmps/mail-nav-side-bar.jsx"

const { useState, useEffect } = React
const { useNavigate, Outlet } = ReactRouterDOM


export function MailIndex() {
    //BETTER TO KEEP THE USE STATE IN THE LOWEST DESCENDANT POSSIBLE
    const [isMailAdd, setIsMailAdd] = useState(false)
    const [filterBy, setFilterBy] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        navigate('/mail/inbox')

    }, [])

    useEffect(() => {
    }, [isMailAdd])

    useEffect(() => {
        // console.log('filterBy', filterBy)
    }, [filterBy])



    
    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }




    function onAddMail() {
        console.log('on add mail')
        setIsMailAdd(true)
    }
    function onCloseAddMail(ev) {
        ev.preventDefault()
        console.log('on CloseMail')
        setIsMailAdd(false)
    }

    return (
        <section className="mail-index">
            <MailHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            <section className="mail-main">
                <MailNavSideBar onAddMail={onAddMail} />
                <Outlet context={[filterBy, setFilterBy]} />
            </section>

            {isMailAdd && <MailAdd onCloseAddMail={onCloseAddMail} />}
        </section>
    )
}

