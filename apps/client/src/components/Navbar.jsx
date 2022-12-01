import { Outlet } from "react-router-dom";

const Navbar = () => {
    // defining variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    // function to determine what navbar to be shown
    const getNavbar = () => {
        if (currUser.type === "staff") {
            return (
                <nav>
                </nav>
            )
        } else if (currUser.type === "vendor") {
            return (
                <nav>
                </nav>
            )
        } else if (currUser.type === "client") {
            return (
                <nav>
                </nav>
            )
        }
    };

    const navbar = getNavbar();

    return (
        <>
            <header id="navbar">
                {navbar}
            </header>
            <Outlet />
        </>
    )
}

export default Navbar;