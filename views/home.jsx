const { Link, NavLink } = ReactRouterDOM


export function Home() {
    return <section className="home">
        <div className="div-header">
            <div className="div-header-text">

                <h1 className="animate__animated animate__fadeInDown">AppSus Gmail and Google Keeper Clone: Your All-in-One Email and Note-Taking Solution</h1>
                <h2 className="animate__animated animate__fadeIn animate__delay-1s">Experience the Power of Gmail and Google Keeper in One Seamless Platform: Efficiently Manage Your Emails and Notes With User-Friendly Clone</h2>
                <NavLink to="/mail"><button className="btn-mail animate__animated animate__fadeIn animate__delay-1s">Mail App</button></NavLink>
                <NavLink to="/note"><button className="btn-keeper animate__animated animate__fadeIn animate__delay-1s">Keeper App</button></NavLink>
                <NavLink to="/book/home"><button className="btn-keeper animate__animated animate__fadeIn animate__delay-1s">Miss Books App</button></NavLink>
                <h3 className="animate__animated animate__fadeInUp animate__delay-2s">Created by Dor & Vlad</h3>

            </div>


            <div className="div-header.image">
                <img src="assets/img/logo/logo.png" className="img-logo animate__animated animate__rotateInDownRight animate__delay-1s" />
            </div>
        </div>
    </section>
}