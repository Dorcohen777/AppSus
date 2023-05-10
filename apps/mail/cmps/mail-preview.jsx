import { mailService } from "../services/mail.service.js"

const { useEffect } = React

export function MailPreview({ mails }) {
    
    useEffect(()=>{
        console.log('mails from mail preview', mails)

    },[mails])

    return (
        <tr>
            <td>title</td>
            <td>content</td>
            <td>date</td>
            <td>buttons on hover</td>
        </tr>
    )
}