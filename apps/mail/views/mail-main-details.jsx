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
    }, [mail])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issues in mail details', err)
                // showErrorMsg('Had issues in mail details')
                navigate('/mail')
            })
    }

    if (!mail) return
    const { from, to, subject, body } = mail
    return (
        // <section>Mail Details Here</section>
        <section>
            <article>From: {from}</article>
            <article>To: {to}</article>
            <article>Subject: {subject}</article>
            <article>Body: {body}</article>
        </section>
    )
}