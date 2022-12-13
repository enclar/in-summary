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
            <div id="project-logs" className="bg-teal-800 w-4/5 px-10 py-4 rounded-md flex flex-col gap-5 items-center">
                <p className="text-slate-50 text-2xl tracking-widest">{project?.title?.toUpperCase()}</p>
                <div className="flex gap-5">
                    <p className="bg-slate-50 px-3 rounded-sm text-teal-800"># {project?.type}</p>
                    <p className="bg-slate-50 px-3 rounded-sm text-teal-800">{project?.location}</p>
                    { 
                        project?.startDate === project?.endDate ? 
                        <p className="bg-slate-50 px-3 rounded-sm text-teal-800">{project?.startDate?.slice(0, 10)}</p> : 
                        <p className="bg-slate-50 px-3 rounded-sm text-teal-800">{project?.startDate?.slice(0,10)} to {project?.endDate?.slice(0,10)}</p>
                    }
                    <p className="bg-slate-50 px-3 rounded-sm text-teal-800">i/c - {project?.inCharge?.name}</p>
                    <p className="bg-slate-50 px-3 rounded-sm text-teal-800">client - {project?.client?.name}</p>
                </div>
                <button className="bg-slate-50 px-4 mt-5 italic rounded-full" onClick={() => setEditing(true)}>edit project details</button>
            </div>
        )
    } else {
        return (
            <div className="w-4/5 bg-teal-800 px-10 py-4 rounded-md flex items-center justify-center">
                <form
                    className="w-4/5  flex gap-x-10 gap-y-4 items-center justify-center flex-wrap"
                    autoComplete="off"
                    onSubmit={handleSubmit(editProjDetails)}
                >
                    <label className="flex flex-col gap-1 text-slate-50">
                        project title
                        <input className="text-teal-900" {...register("title")} defaultValue={project?.title} required={true} />
                    </label>

                    <label className="flex flex-col gap-1 text-slate-50">
                        event type
                        <select {...register("type")} className="text-teal-900" required={true} defaultValue={project?.type}>
                            <option>wedding</option>
                            <option>corporate</option>
                            <option>party</option>
                            <option>styled shoot</option>
                            <option>others</option>
                        </select>
                    </label>

                    <label className="flex flex-col gap-1 text-slate-50">
                        start date
                        <input {...register("startDate")} type="date" className="text-teal-900" required={true} defaultValue={project?.startDate?.slice(0, 10)} />
                    </label>

                    <label className="flex flex-col gap-1 text-slate-50">
                        end date
                        <input {...register("endDate")} type="date" className="text-teal-900" required={true} defaultValue={project?.endDate?.slice(0, 10)} />
                    </label>

                    <label className="flex flex-col gap-1 text-slate-50">
                        project i/c
                        <select {...register("inChargeId")} className="text-slate-900" defaultValue={project?.inCharge?.name}>
                            { staff?.map((staff, index) => <option key={index}>{staff.name}</option>) }
                        </select>
                    </label>

                    <label className="flex flex-col gap-1 text-slate-50">
                        client
                        <p className="bg-slate-50 text-teal-900 px-3">{project?.client?.name}</p>
                    </label>

                    <button className="bg-teal-600 text-slate-50 py-1 px-5 rounded-full">update project details</button>
                </form>
            </div>

        )
    }

}

export default ProjectLogs;