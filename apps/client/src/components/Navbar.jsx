import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    // defining variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    // mapping custom widgets
    const widgets = ["weekly review", "projects", "enquiries", "to-do list"];

    const widgetMap = widgets?.map((widget) => {
        return (
            <label className="flex gap-1">
                <input type="checkbox" />
                {widget}
            </label>
        )
    });

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
        <div className="flex">
            <nav
                id="navbar"
                className="bg-sky-100 w-1/5 min-h-screen px-10 py-10 flex flex-col justify-between items-center gap-48"
            >
                <div className="flex flex-col items-center">
                    <h1 className="text-sky-900 text-5xl tracking-widest">
                        tl; dr
                    </h1>
                    {
                        currUser ?
                        <p
                            id="navbar-hello-msg"
                            className="bg-sky-900 mt-9 px-5 py-2 rounded-full text-sky-50 text-lg tracking-wide"
                        >
                            hello {currUser?.username?.toLowerCase()}!
                        </p>
                        :
                        <></>
                    }
                </div>

                <div id="navbar-tabs" className="flex flex-col gap-4">
                    {navbar}
                </div>

                <div
                    id="custom-widgets"
                    className="flex flex-col align-center justify-center gap-2"
                >
                    <p className="text-center">customise your homepage</p>
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {widgetMap}
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Navbar;