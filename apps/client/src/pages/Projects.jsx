import { useEffect } from "react";
import { Link } from "react-router-dom";
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
                    console.log("server error:", data.error);
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