import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { clientAtom, staffAtom } from "../../pages/NewProject";
import { projectAtom } from "../../pages/Projects";
import { toast } from "react-toastify";

const NewProjectForm = () => {
    // setting up jotai state
    const [clients, setClients] = useAtom(clientAtom);
    const [staff, setStaff] = useAtom(staffAtom);
    const [projects, setProjects] = useAtom(projectAtom);

    // setting up react hook form
    const { register, handleSubmit } = useForm();

    // create new project
    const addProject = async (data) => {
        // getting the client and in-charge details to pass back to the server
        data.clientId = clients?.filter((client) => client.name === data.clientId).map((client) => client.id)[0];
        data.inChargeId = staff?.filter((staff) => staff.name === data.inChargeId).map((staff) => staff.id)[0];
        data.startDate = new Date(data.startDate);
        data.endDate = new Date(data.endDate);
        data.budget = parseInt(data.budget);

        console.log(data);

        try {
            const response = await fetch("/api/projects/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added new project:", data2);
                setProjects({...projects, data2});
                toast.success("New project added!", { toastId: "project-add-msg" });
            } else {
                console.log("client error:", data2.error);
                toast.error("Unable to add project, please try again", { toastId: "project-no-add-msg" });
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <form id="new-project-form" className="flex flex-col items-center gap-4" method="post" onSubmit={handleSubmit(addProject)}>
            <legend className="bg-sky-700 mt-10 mb-5 px-5 py-1 rounded-full text-slate-50 tracking-wider">add a new project</legend>

            <label className="w-full flex flex-col">
                project title
                <input {...register("title")} className="bg-slate-300" required={true} />
            </label>

            <div className="flex gap-6">
                <label className="flex flex-col">
                    start date
                    <input {...register("startDate")} type="date" className="bg-slate-300" required={true} />
                </label>

                <label className="flex flex-col">
                    end date
                    <input {...register("endDate")} type="date" className="bg-slate-300" required={true} />
                </label>
            </div>

            <div className="w-full flex gap-6 justify-around">
                <label className="flex flex-col">
                    event type
                    <select {...register("type")} className="bg-slate-300" required={true}>
                        <option>wedding</option>
                        <option>corporate</option>
                        <option>party</option>
                        <option>styled shoot</option>
                        <option>others</option>
                    </select>
                </label>

                <label className="flex flex-col">
                    client
                    <select {...register("clientId")} className="bg-slate-300" required={true}>
                        { clients?.map((client, index) => <option key={index}>{client.name}</option>) }
                    </select>
                </label>
            </div>

            <label className="w-full flex flex-col">
                location
                <textarea {...register("location")} className="bg-slate-300" />
            </label>

            <div className="w-full flex justify-around">
                <label className="w-36 flex flex-col">
                    budget
                    <input {...register("budget")} type="number" className="bg-slate-300 pl-1" />
                </label>

                <label className="flex flex-col">
                    project i/c
                    <select {...register("inChargeId")} className="pt-1 bg-slate-300">
                        { staff?.map((staff, index) => <option key={index}>{staff.name}</option>) }
                    </select>
                </label>
            </div>

            <button className="bg-sky-700 mt-10 px-5 py-1 rounded-full text-slate-50 tracking-wider">create</button>
        </form>
    )
}

export default NewProjectForm;