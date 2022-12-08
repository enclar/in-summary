import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import ProjectSummary from "../components/Projects/ProjectSummary";

export const projectAtom = atom([]);

const Projects = () => {
    // retrieving variables from local storage
    const token = JSON.parse(localStorage.getItem("token"));

    // setting up jotai
    const [projects, setProjects] = useAtom(projectAtom);

    // using use effect to get all projects
    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const response = await fetch("/api/projects/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: token
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched all projects:", data);
                    setProjects(data);
                } else {
                    console.log("server error:", error);
                }
            } catch(error) {
                console.log("client error:", error);
            }
        };

        getAllProjects();
    }, []);

    // mapping project summaries
    const projectSummaries = projects?.map((project, index) => (
        <ProjectSummary key={index} project={project} />
    ))

    return (
        <div id="projects" className="mt-20 flex flex-col items-center">
            <div id="project-summaries" className="w-9/12 flex flex-wrap gap-5 items-center">
                {projectSummaries}
            </div>
        </div>
    )
}

export default Projects;