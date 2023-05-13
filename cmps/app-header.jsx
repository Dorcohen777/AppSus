const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
        document.querySelector('.app-header nav').classList.toggle('show')
    }

    return <header className="app-header">
        <Link to="/">
            <img src="assets/img/logo/logo.png" />
            <h3>AppSus</h3>
        </Link>
        <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/note">Book</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>
        <div className="hamburger-menu" onClick={() => toggleMenu()}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>

}
