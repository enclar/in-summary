import { Outlet, Link } from "react-router-dom";

const AdminNavbar = () => {
    return (
        <div className="w-4/5 flex flex-col items-center">
            <div
                id="admin-navbar-tabs"
                className="pt-24 flex gap-10 items-center justify-center"
            >
                <Link to="/enquiries" className="bg-slate-400 px-4 py-2 rounded-full text-slate-50 tracking-wider">enquiries</Link>
                <Link to="/new-account" className="bg-slate-400 px-4 py-2 rounded-full text-slate-50 tracking-wider">create new account</Link>
                <Link className="bg-slate-400 px-4 py-2 rounded-full text-slate-50 tracking-wider">all accounts</Link>
                <Link className="bg-slate-400 px-4 py-2 rounded-full text-slate-50 tracking-wider">generate worker list</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default AdminNavbar;