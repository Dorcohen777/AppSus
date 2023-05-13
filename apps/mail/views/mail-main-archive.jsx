import { MailList } from "../cmps/mail-list.jsx"

const { useEffect } = React
const { useOutletContext } = ReactRouterDOM

export function MailMainAll() {
    const [filterBy, setFilterBy] = useOutletContext()

    useEffect(() => {
        setFilterBy({ ...filterBy })
    }, [])

    return (
        <MailList filterBy={filterBy} />
    )
}