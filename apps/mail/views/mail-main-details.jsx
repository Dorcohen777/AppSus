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
            <article>From: {from}</article>
            <article>To: {to}</article>
            <article>Subject: {subject}</article>
            <article>Body: {body}</article>
            <article>Text: {txt}</article>
        </section>
    )
}