import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { staffAtom } from "./NewProject";
import ProjectTable from "../components/Projects/ProjectTable";

export const projectAtom = atom([]);

const Projects = () => {
    // retrieving variables from local storage
    const token = JSON.parse(localStorage.getItem("token"));

    // setting up jotai
    const [projects, setProjects] = useAtom(projectAtom);
    const [staff, setStaff] = useAtom(staffAtom);

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

        const getStaff = async () => {
            try {
                const response = await fetch("/api/staff/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: token
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched staff:", data);
                    setStaff(data);
                } else {
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        }

        getStaff();
    }, []);

    return (
        <div id="projects" className="mt-20 flex flex-col items-center">
            <ProjectTable />
        </div>
    )
}

export default Projects;