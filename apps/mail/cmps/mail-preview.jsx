import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

const { useEffect } = React
const { Link } = ReactRouterDOM

export function MailPreview({ mail, onArchiveMail, onTrashMail, onToggleReadState, onStarMail }) {

    useEffect(() => {
        // console.log('mail from mail preview', mail)

    }, [mail])


    function renderDate(sentAt) {
        const date = new Date(sentAt)
        return `${date.getDate()} ${utilService.getMonthName(date)}`
    }



    //TODO: make css for class btnLook
    return (
        <tr>
            <td>
                <Link to={`/mail/details/${mail.id}`}>
                    <section className={`mail-preview ${!mail.isRead && 'mail-unread'}`}>
                        <section className="mail-star">
                            <i className={`btnLookIcon ${mail.isStared && 'goldStar'} fa-solid fa-star`} onClick={(ev) => onStarMail(ev, mail.id, !mail.isStared)}></i>
                        </section>
                        <section className="mail-title"><span>{mail.subject}</span></section>
                        <section className="mail-content"><span>{mail.body}</span></section>
                        <section className="mail-date"><span>{renderDate(mail.sentAt)}</span></section>
                        <section className="mail-buttons">
                            <span>
                                <i className="btnLookIcon fa-solid fa-box-archive" onClick={(ev) => onArchiveMail(ev, mail.id)}></i>
                                <i className="btnLookIcon fa-solid fa-trash" onClick={(ev) => onTrashMail(ev, mail.id)}></i>
                                <i className="btnLookIcon fa-solid fa-envelope-open" onClick={(ev) => onToggleReadState(ev, mail.id, !mail.isRead)} ></i>
                            </span>
                        </section>
                    </section>
                </Link>
            </td>
        </tr >
    )
}