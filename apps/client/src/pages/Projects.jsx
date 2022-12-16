import { Link, Navigate } from "react-router-dom";
import ProjectTable from "../components/Projects/ProjectTable";
import ClientProjects from "../components/Projects/ClientProjects";

const Projects = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));

    if (!user) {
        return <Navigate replace to="/login" />
    } else if (user?.accType === "client") {
        return <ClientProjects />
    } else if (user?.accType === "staff") {
        return (
            <div id="projects" className="px-10 py-20 w-screen min-h-screen h-fit flex flex-col items-center gap-10">
                <Link
                    className="text-teal-900 font-serif tracking-widest italic font-semibold hover:underline"
                    to="/new-project"
                >add a new project</Link>
                <p className="text-teal-900 font-serif tracking-widest">OR</p>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-teal-900 font-serif tracking-widest italic font-semibold">click to view an existing project</p>
                    <ProjectTable />
                </div>
    
            </div>
        )
    }
}

export default Projects;