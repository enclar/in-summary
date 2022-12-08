import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import ProjectSummary from "../components/Projects/ProjectSummary";

export const projectAtom = atom([]);

const Projects = () => {
    // setting up jotai
    const [projects, setProjects] = useAtom(projectAtom);

    // function to get all projects
    useEffect(() => {
        const getProjects = async () => {
            try {
                const response = await fetch("/api/projects/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched all projects:", data);
                    setProjects(data);
                } else {
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

        getProjects();
    }, []);

    // mapping project summaries
    const projectSummaries = projects?.map((project, index) => (
        <ProjectSummary key={index} project={project} />
    ))

    return (
        <div id="projects" className="mt-20 flex flex-col items-center">
            <div id="project-summaries" className="flex gap-10">
                {projectSummaries}
            </div>
        </div>
    )
}

export default Projects;