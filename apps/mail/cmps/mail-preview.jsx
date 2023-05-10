import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { useEffect } = React

export function MailPreview({ mail }) {

    useEffect(() => {
        console.log('mail from mail preview', mail)

    }, [])


    function renderDate(sentAt) {
        const date = new Date(sentAt)
        return `${date.getDate()} ${utilService.getMonthName(date)}`
    }

    return (
        <tr>
            <td>
                <section className="mail-title"><span>{mail.subject}</span></section>
                <section className="mail-content"><span>{mail.body}</span></section>
                <section className="mail-date-buttons">
                    <article className="mail-date"><span>{renderDate(mail.sentAt)}</span></article>
                    <article className="mail-buttons"><span>
                        <i className="fa-solid fa-box-archive"></i>
                        <i className="fa-solid fa-trash"></i>
                        <i className="fa-solid fa-envelope-open"></i>
                    </span></article>
                </section>
            </td>
        </tr>
    )
}