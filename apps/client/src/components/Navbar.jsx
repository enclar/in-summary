import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    // defining variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    // function to determine what navbar to be shown
    const getNavbar = () => {
        if (currUser.accountType === "staff") {
            return (
                <div>
                    <Link>Projects</Link>
                    <Link>Calendar</Link>
                    <Link>Admin</Link>
                    <Link>Profile</Link>
                    <Link>Logout</Link>
                </div>
            )
        } else if (currUser.accountType === "vendor") {
            return (
                <div>
                    <Link>Projects</Link>
                    <Link>Calendar</Link>
                    <Link>Requests</Link>
                    <Link>Profile</Link>
                    <Link>Logout</Link>
                </div>
            )
        } else if (currUser.accountType === "client") {
            return (
                <div>
                    <Link>Projects</Link>
                    <Link>Calendar</Link>
                    <Link>Profile</Link>
                    <Link>Logout</Link>
                </div>
            )
        }
    };

    const navbar = getNavbar();

    return (
        <>
            <header id="navbar">
                <nav>
                    <h1>
                        tl; dr
                    </h1>
                    {navbar}
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Navbar;