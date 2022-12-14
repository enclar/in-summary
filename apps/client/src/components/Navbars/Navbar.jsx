import { Outlet, Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    // defining variables
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    const navigate = useNavigate();

    // function to logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center">
            <div
                id="navbar"
                className="w-screen h-40 my-10 border-y-8 px-20 py-10 border-double flex justify-evenly items-center"
            >
                <div className="flex gap-16">
                    <Link to="/projects" className="font-serif italic text-xl tracking-wider hover:underline">projects</Link>
                    <Link to="/inventory" className="font-serif italic text-xl tracking-wider hover:underline">inventory</Link>
                    <Link to="/enquiries" className="font-serif italic text-xl tracking-wider hover:underline">admin</Link>
                </div>

                <div>
                    <p className="text-4xl tracking-widest font-serif">tl; dr</p>
                </div>

                <div className="flex gap-16">
                    <p className="font-serif italic text-xl tracking-wider">welcome, {currUser?.name?.toLowerCase()}!</p>
                    <p onClick={handleLogout} className="font-serif italic text-xl tracking-wider cursor-pointer hover:underline">logout</p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar;