import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currProjAtom } from "../Projects/ProjectTableRow";

const Navbar = () => {
    // defining variables
    const user = JSON.parse(localStorage.getItem("currUser"));
    const navigate = useNavigate();
    const [currProject, setCurrProject] = useAtom(currProjAtom);

    // function to logout
    const handleLogout = () => {
        localStorage.clear();
        setCurrProject({});
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
                    {
                        user?.accType === "staff" ?
                        <Link to="/enquiries" className="font-serif italic text-xl tracking-wider hover:underline">admin</Link> :
                        <Link className="font-serif italic text-xl tracking-wider hover:underline">account</Link>
                    }
                    
                </div>

                <div>
                    <p className="text-4xl text-teal-900 tracking-widest font-serif">in summary;</p>
                </div>

                <div className="flex gap-16">
                    <p id="welcome-msg" className="font-serif italic text-xl tracking-wider">welcome, {user?.name?.toLowerCase()}!</p>
                    <p onClick={handleLogout} className="font-serif italic text-xl tracking-wider cursor-pointer hover:underline">logout</p>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Navbar;