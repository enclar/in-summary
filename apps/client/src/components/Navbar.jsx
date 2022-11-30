import { Outlet } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <header id="navbar">
                <nav>
                    <h1>tl:dr</h1>
                    
                </nav>
            </header>
            <Outlet />
        </>
    )
}

export default Navbar;