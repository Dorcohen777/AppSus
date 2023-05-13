const { useState, useEffect } = React

export function MailHeader({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
        console.log('filterBy from mail header', filterBy)
    }, [filterByToEdit])


    function handleChange({ target }) {
        console.log('target.value', target.value)
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }
    
    return (
        <section className="mail-header">
            <article className="img-gmail-container">
                <img src="assets/img/logo/gmail-logo.png" alt="gmail" />
                <span className="span-gmail-logo">Gmail</span>
            </article>
            <div className="search-container">
                <i className="fas fa-search"></i>
                <input type="search" name="subject" className="input-search" onChange={handleChange} placeholder="Search Mail" />
            </div>

        </section>
    )
}