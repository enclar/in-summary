import { Link } from "react-router-dom";

const ProjectNavbar = () => {
    return (
        <div className="w-screen flex flex-col items-center">
            <div
                id="admin-navbar-tabs"
                className="flex gap-10 items-center justify-center"
            >
                <Link to="/projects" className="px-4 py-2 border-4 border-double rounded-full text-teal-900 text-lg font-serif tracking-wider">live projects</Link>
                <Link to="/new-project" className="px-4 py-2 rounded-full text-teal-900 text-lg font-serif tracking-wider">create new project</Link>
            </div>
        </div>
    );
};

export default ProjectNavbar;