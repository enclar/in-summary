import { Link } from "react-router-dom";
import ProjectTable from "../components/Projects/ProjectTable";

const Projects = () => {
    return (
        <div id="projects" className="my-10 w-screen flex flex-col items-center gap-10">
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

export default Projects;