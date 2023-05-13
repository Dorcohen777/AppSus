import { MailList } from "../cmps/mail-list.jsx"

const { useEffect } = React
const { useOutletContext } = ReactRouterDOM

export function MailMainStarred() {
    const [filterBy, setFilterBy] = useOutletContext()

    useEffect(() => {
        setFilterBy({ ...filterBy, isStared: true })
    }, [])

    return (
        <MailList filterBy={filterBy} />
    )
}