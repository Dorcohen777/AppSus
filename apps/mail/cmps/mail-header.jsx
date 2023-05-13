export function MailHeader() {
    return (
        <section className="mail-header">
            <article className="img-gmail-container">
                <img src="assets/img/logo/gmail-logo.png" alt="gmail" />
                <span className="span-gmail-logo">Gmail</span>
            </article>
            <div className="search-container">
                <i className="fas fa-search"></i>
                <input type="search" name="search" className="input-search" placeholder="Search Mail" />
            </div>

        </section>
    )
}