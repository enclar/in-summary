import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
    // defining variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div className="flex flex-col items-center">
            <div
                id="navbar"
                className="w-screen h-40 my-10 border-y-8 px-20 py-10 border-double flex justify-evenly items-center"
            >
                <div className="flex gap-16">
                    <Link to="/projects" className="font-serif italic text-xl tracking-wider">projects</Link>
                    <Link to="/inventory" className="font-serif italic text-xl tracking-wider">inventory</Link>
                    <Link to="/enquiries" className="font-serif italic text-xl tracking-wider">admin</Link>
                </div>

                <div>
                    <p className="text-4xl tracking-widest font-serif">tl; dr</p>
                </div>

                <div className="flex gap-16">
                    <p className="font-serif italic text-xl tracking-wider">welcome, {currUser?.name?.toLowerCase()}!</p>
                    <Link className="font-serif italic text-xl tracking-wider">logout</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar;