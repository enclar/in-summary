import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { staffAtom } from "../../pages/NewProject";
import ProjectTableRow from "./ProjectTableRow";

export const projectAtom = atom([]);

const ProjectTable = () => {
    // setting up projects with jotai
    const [projects, setProjects] = useAtom(projectAtom);
    const [staff, setStaff] = useAtom(staffAtom);

    // using use effect to get all projects and staff
    useEffect(() => {
        const getAllProjects = async () => {
            try {
                const response = await fetch("/api/projects/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: JSON.parse(localStorage.getItem("token"))
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
                        token: JSON.parse(localStorage.getItem("token"))
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

    // mapping out table rows
    const rows = projects?.map((project, index) => {
        return(
            <ProjectTableRow key={index} project={project} index={parseInt(index)} />
        )
    });

    return (
        <table>
            <thead>
                <tr className="border-y-4 border-double text-teal-900 italic tracking-widest font-serif">
                    <th className="px-10 py-2 border-r-2">type</th>
                    <th className="px-10 py-2 border-r-2">project</th>
                    <th className="px-10 py-2 border-r-2">date</th>
                    <th className="px-10 py-2 border-r-2">location</th>
                    <th className="px-10 py-2 border-r-2">client</th>
                    <th className="px-10 py-2">in-charge</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default ProjectTable;