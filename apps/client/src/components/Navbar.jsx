import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    // defining variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    // function to determine what navbar to be shown
    const getNavbar = () => {
        if (currUser?.accountType === "staff") {
            return (
                <>
                    <Link>projects</Link>
                    <Link>calendar</Link>
                    <Link>admin</Link>
                    <Link>profile</Link>
                    <Link>logout</Link>
                </>
            )
        } else if (currUser?.accountType === "vendor") {
            return (
                <>
                    <Link>projects</Link>
                    <Link>calendar</Link>
                    <Link>requests</Link>
                    <Link>profile</Link>
                    <Link>logout</Link>
                </>
            )
        } else if (currUser?.accountType === "client") {
            return (
                <>
                    <Link>projects</Link>
                    <Link>calendar</Link>
                    <Link>profile</Link>
                    <Link>logout</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to="/login">login</Link>
                </>
            )
        }
    };

    const navbar = getNavbar();

    return (
        <>
            <header
                id="navbar"
                className="px-12 py-6 bg-slate-300"
            >
                <nav className="flex justify-between items-center">
                    <h1 className="text-3xl tracking-widest">
                        tl; dr
                    </h1>
                    <div className="flex flex-col items-end gap-1">
                        {
                            currUser ?
                            <p id="navbar-hello-msg" className="text-large">
                                hello {currUser?.username?.toLowerCase()}!
                            </p>
                            :
                            <></>
                        }
                        <div id="navbar-tabs" className="flex gap-4">
                            {navbar}
                        </div>
                    </div>
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Navbar;