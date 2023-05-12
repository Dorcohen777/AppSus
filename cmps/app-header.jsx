const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <img src="/assets/img/logo/logo.png" />
            <h3>AppSus</h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/note">Book</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
    </header>
}
