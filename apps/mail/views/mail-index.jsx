import { MailAdd } from "../cmps/mail-add.jsx"
import { MailHeader } from "../cmps/mail-header.jsx"
import { MailMain } from "../cmps/mail-main.jsx"

const { useState, useEffect } = React


export function MailIndex() {
    //BETTER TO KEEP THE USE STATE IN THE LOWEST DESCENDANT POSSIBLE
    const [isMailAdd, setIsMailAdd] = useState(false)

    useEffect(() => {
        
    }, [isMailAdd])


    function onAddMail(){
        console.log('on add mail')
        setIsMailAdd(true)
    }
    function onCloseAddMail(){
        console.log('on CloseMail')
        setIsMailAdd(false)
    }

    return (
        <section className="mail-index">
            <MailHeader />
            <MailMain onAddMail={onAddMail} />
            {isMailAdd && <MailAdd onCloseAddMail={onCloseAddMail} />}
        </section>
    )
}

