import { mailService } from "../services/mail.service.js"

const { useEffect } = React

export function MailPreview({ mail }) {

    useEffect(() => {
        console.log('mail from mail preview', mail)

    }, [])

    return (
        <tr>
            {/* <td>title</td>
            <td>content</td>
            <td>date</td>
            <td>buttons on hover</td> */}

            <td>
                <section className="mail-title"><span>{mail.subject}</span></section>
                <section className="mail-content"><span>{mail.body}</span></section>
                <section className="mail-date-buttons">
                    <article className="mail-date"><span>date</span></article>
                    <article className="mail-buttons"><span>buttons</span></article>
                </section>
            </td>
        </tr>
    )
}