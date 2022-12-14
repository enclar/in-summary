import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { toast } from "react-toastify";

import { currProjAtom } from "../../Projects/ProjectTableRow";
import { staffAtom } from "../../../pages/NewProject";

const AddTask = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [staff] = useAtom(staffAtom);
    const { register, handleSubmit } = useForm();

    // function to add new task
    const newTask = async (data) => {
        data.dueBy = new Date(data.dueBy);
        data.projectId = project.id;
        console.log("data:", data);

        try {
            const response = await fetch("/api/tasks/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added task:", data2);
                setProject(data2?.project);
                document.getElementById("add-task-form").reset();
            } else {
                console.log("server error:", data2.error);
                toast.error("Unable to add task, please try again");
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <form
            id="add-task-form"
            className="flex flex-col gap-3 items-center"
            onSubmit={handleSubmit(newTask)}
            method="post"
            autoComplete="off"
        >
            <legend className="text-teal-900 font-semibold italic text-center tracking-wider text-md">add a new task</legend>
            <div className="flex gap-10 items-center">
                <label className="flex gap-2 items-center text-slate-700 tracking-wider">
                    due by:
                    <input type="date" {...register("dueBy")} className="bg-orange-50 text-slate-700 p-1" required={true} />
                </label>

                <label className="flex gap-2 items-center text-slate-700 tracking-wider">
                    task:
                    <input {...register("description")} className="bg-orange-50 text-slate-700 p-1" required={true} />
                </label>

                <label className="flex gap-2 items-center text-slate-700 tracking-wider">
                    done by:
                    <select {...register("doneBy")} className="bg-orange-50 text-slate-700 p-1">
                        <option>{project?.client?.name}</option>
                        { staff?.map((staff, index) => <option key={index}>{staff?.name}</option>) }
                    </select>
                </label>
                <button className="bg-teal-900 text-slate-50 ml-2 px-5 rounded-full">add</button>
            </div>
        </form>
    )
}

export default AddTask;