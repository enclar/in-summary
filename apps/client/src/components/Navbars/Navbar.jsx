import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    // defining variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    // mapping custom widgets
    const widgets = ["weekly review", "projects", "enquiries", "to-do list"];

    const widgetMap = widgets?.map((widget, index) => {
        return (
            <label className="flex gap-1" key={index}>
                <input type="checkbox" />
                {widget}
            </label>
        )
    });

    return (
        <div className="flex">
            <div
                id="navbar"
                className="bg-sky-100 w-1/5 min-h-screen px-10 py-12 flex flex-col justify-around items-center"
            >
                <div className="flex flex-col items-center gap-5">
                    <p className="text-xl tracking-widest">tl; dr</p>
                    <p>welcome, {currUser?.name?.toLowerCase()}!</p>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <Link to="/projects">projects</Link>
                    <Link>inventory</Link>
                    <Link to="/enquiries">admin</Link>
                    <Link>logout</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar;