import { Outlet, Link } from "react-router-dom";

const ProjectNavbar = () => {
    return (
        <div className="w-4/5 flex flex-col items-center">
            <div
                id="admin-navbar-tabs"
                className="pt-24 flex gap-10 items-center justify-center"
            >
                <Link to="/projects" className="bg-slate-400 px-4 py-2 rounded-full text-slate-50 tracking-wider">live projects</Link>
                <Link to="/new-project" className="bg-slate-400 px-4 py-2 rounded-full text-slate-50 tracking-wider">create new project</Link>
            </div>
            <Outlet />
        </div>
    );
};

export default ProjectNavbar;