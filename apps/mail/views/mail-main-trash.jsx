import { MailList } from "../cmps/mail-list.jsx"

const { useEffect } = React
const { useOutletContext } = ReactRouterDOM

export function MailMainTrash() {
    const [filterBy, setFilterBy] = useOutletContext()

    useEffect(() => {
        setFilterBy({ ...filterBy, status: 'trash', isStared: 'any' })
    }, [])

    return (
        <MailList filterBy={filterBy} />
    )
}