import { mailService } from "../services/mail.service.js"

const { useParams, useNavigate } = ReactRouterDOM
const { useEffect, useState } = React

export function MailMainDetails() {
    const [mail, setMail] = useState(null)

    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('mailId', mailId)
        console.log('mail', mail)
        if (!mail) loadMail()
        else setStateToRead()
    }, [mail])

    function loadMail() {
        mailService.get(mailId)
            .then((mail) => {
                setMail(mail)
            }
            )
            .catch(err => {
                console.log('Had issues in mail details', err)
                // showErrorMsg('Had issues in mail details')
                navigate('/mail')
            })
            // .finally(setStateToRead())
    }

    function setStateToRead() {
        console.log('id TOGGLE READ STATE', mail.id)
        mailService.changeMailState(mail.id, { isRead: true })
            .then(mail => {
                console.log('edited mail', mail)
            })
            .catch(err => {
                console.log('err Could not save mail', err)
            })
    }

    if (!mail) return
    const { from, to, subject, body, txt } = mail
    return (
        <section className="mail-main-details">
            <article className="mail-details-from">From: {from}</article>
            <article className="mail-details-to">To: {to}</article>
            <article className="mail-details-subject">Subject: {subject}</article>
            <article className="mail-details-body">Body: {body}</article>
            <article className="mail-details-text">Text: {txt}</article>
        </section>
    )
}