export function MailNavSideBar({ onAddMail }) {

    // function onAddMail() {
    //     console.log('on add mail')
    //     console.log('isMailAdd', isMailAdd)
    //     isMailAdd.current = true
    //     console.log('isMailAdd', isMailAdd)
    // }

    return (
        <section className="mail-nav-side-bar">
            <h2>Mail Side Nav Bar Here</h2>
            <section className="btnLook" onClick={onAddMail}>New Mail</section>
            <section>
                <article>Inbox</article>
                <article>Starred</article>
                <article>Sent</article>
                <article>Draft</article>
                <article>Trash</article>
            </section>
        </section>
    )
}