import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { currProjAtom } from "./ProjectTableRow";
import ProjectDetails from "../../pages/ProjectDetails";

export const clientProjectAtom = atom([]);

const ClientProjects = () => {
    const [clientProjects, setClientProjects] = useAtom(clientProjectAtom);
    const [currProject, setCurrProject] = useAtom(currProjAtom);
    const user = JSON.parse(localStorage.getItem("currUser"));

    useEffect(() => {
        const getClientProjects = async () => {
            const url = "/api/projects/client-all/" + user.id;

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: JSON.parse(localStorage.getItem("token"))
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched projects for client:", data);
                    setClientProjects(data);
                } else {
                    console.log("server error:", data?.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        }

        getClientProjects();
    }, []);

    if (clientProjects?.length === 0) {
        return (
            <div id="client-projects" className="py-20 px-10 w-screen min-h-screen flex flex-col items-center gap-10 font-serif">
                <p className="text-teal-900 font-serif tracking-widest italic font-semibold">no projects available</p>
            </div>
        )
    } else {
        return (
            <div id="client-projects" className="py-20 px-10 w-screen min-h-screen flex flex-col items-center gap-10 font-serif">
                <p id="click-proj-msg" className="text-teal-900 font-serif tracking-widest italic font-semibold">click one of your projects to view more details</p>
                <div className="flex items-center justify-center gap-5">
                    {
                        clientProjects?.map((project, index) => {
                            return (
                                <p
                                    id={`client-proj-${index}`}
                                    key={index}
                                    className="border-stone-600 border-double border-4 px-5 py-3 text-slate-700 tracking-wider hover:bg-orange-50 hover:cursor-pointer"
                                    onClick={() => setCurrProject(project)}
                                >
                                    {project?.title}
                                </p>
                            )
                        })
                    }
                </div>
                {
                    Object.keys(currProject).length === 0 ?
                    <></> :
                    <ProjectDetails />
                }
            </div>
        )
    }
}

export default ClientProjects;