import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { currProjAtom } from "../Projects/ProjectTableRow";
import { staffAtom } from "../../pages/NewProject";

const ProjectLogs = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [staff] = useAtom(staffAtom);
    const [editing, setEditing] = useState(false);

    const { register, handleSubmit } = useForm();

    // function to update project details
    const editProjDetails = async (data) => {
        data.inChargeId = staff?.filter((staff) => staff.name === data.inChargeId).map((staff) => staff.id)[0];
        data.startDate = new Date(data.startDate);
        data.endDate = new Date(data.endDate);

        const url = "/api/projects/update/" + project.id;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("updated project:", data2);
                setProject(data2);
                setEditing(false);
            } else {
                console.log("server error:", data2.error);
            }
        } catch (error) {
            console.log("client error:", error)
        }
    }

    if (!editing) {
        return (
            <div id="project-logs" className="w-full p-10 border-double border-8 font-serif flex flex-col gap-5 items-center">
                <p className="text-teal-900 text-3xl tracking-widest">{project?.title?.toUpperCase()}</p>
                <div className="flex gap-5 justify-center items-center">
                    <table>
                        <tbody>
                            <tr className="text-slate-700 tracking-wider italic">
                                <td className="px-5 py-1 border-x-2"># {project?.type}</td>
                                
                                <td className="px-5 py-1 border-r-2">{project?.location}</td>
                                
                                { 
                                    project?.startDate === project?.endDate ? 
                                    <td className="px-5 py-1 border-r-2">{project?.startDate?.slice(0, 10)}</td> : 
                                    <td className="px-5 py-1 border-r-2">{project?.startDate?.slice(0,10)} to {project?.endDate?.slice(0,10)}</td>
                                }

                                <td>
                                    <p className="px-5 py-1 border-r-2">i/c - {project?.inCharge?.name}</p>
                                </td>
                                
                                <td>
                                    <p className="px-5 py-1 border-r-2">client - {project?.client?.name}</p>
                                </td>
                            </tr>              
                        </tbody>
                    </table>
                    <ion-icon name="create-outline" size="large" onClick={() => setEditing(true)} style={{ color: "darkGrey", cursor: "pointer" }}></ion-icon>
                </div>
            </div>
        )
    } else {
        return (
            <div id="project-logs" className="w-full p-10 border-double border-8 font-serif flex flex-col gap-5 items-center">
                <form
                    className="w-4/5 flex flex-col gap-8 items-center justify-center flex-wrap"
                    autoComplete="off"
                    onSubmit={handleSubmit(editProjDetails)}
                >
                    <label className="flex flex-col gap-1 text-slate-700 tracking-wider">
                        project title
                        <input className="text-teal-900 bg-orange-50 px-2 py-1" {...register("title")} defaultValue={project?.title} required={true} />
                    </label>

                    <div className="flex w-7/8 flex-wrap gap-10 items-center justify-center">
                        <label className="flex flex-col gap-1 text-slate-700 tracking-wider">
                            event type
                            <select {...register("type")} className="text-teal-900 bg-orange-50 px-2 py-1" required={true} defaultValue={project?.type}>
                                <option>wedding</option>
                                <option>corporate</option>
                                <option>party</option>
                                <option>styled shoot</option>
                                <option>others</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 text-slate-700 tracking-wider">
                            location
                            <input className="text-teal-900 bg-orange-50 px-2 py-1" {...register("location")} defaultValue={project?.location} required={true} />
                        </label>

                        <label className="flex flex-col gap-1 text-slate-700 tracking-wider">
                            start date
                            <input {...register("startDate")} type="date" className="text-teal-900 bg-orange-50 px-2 py-1" required={true} defaultValue={project?.startDate?.slice(0, 10)} />
                        </label>

                        <label className="flex flex-col gap-1 text-slate-700 tracking-wider">
                            end date
                            <input {...register("endDate")} type="date" className="text-teal-900 bg-orange-50 px-2 py-1" required={true} defaultValue={project?.endDate?.slice(0, 10)} />
                        </label>

                        <label className="flex flex-col gap-1 text-slate-700 tracking-wider">
                            project i/c
                            <select {...register("inChargeId")} className="text-teal-900 bg-orange-50 px-2 py-1" defaultValue={project?.inCharge?.name}>
                                { staff?.map((staff, index) => <option key={index}>{staff.name}</option>) }
                            </select>
                        </label>

                        <label className="flex flex-col gap-1 text-slate-700 tracking-wider">
                            client
                            <p className="text-teal-900 bg-orange-50 px-2 py-1">{project?.client?.name}</p>
                        </label>
                    </div>


                    <button className="bg-teal-900 text-slate-50 italic tracking-wider mt-5 py-1 px-5 rounded-full">update project details</button>
                </form>
            </div>

        )
    }

}

export default ProjectLogs;