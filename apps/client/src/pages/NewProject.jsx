import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { atom, useAtom } from "jotai";
import { projectAtom } from "./Projects";
import { toast, ToastContainer } from "react-toastify";

export const staffAtom = atom([]);
export const clientAtom = atom([]);

const NewProject = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    // setting up react hook form
    const { register, handleSubmit } = useForm();

    // setting up jotai
    const [staff, setStaff] = useAtom(staffAtom);
    const [clients, setClients] = useAtom(clientAtom);
    const [projects, setProjects] = useAtom(projectAtom);

    // useEffect to fetch all the neccessary accounts
    useEffect(() => {
        const getUsers = async () => {
            try {
                const responseClient = await fetch("/api/clients/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: token
                    }
                });

                const dataClient = await responseClient.json();

                if (responseClient.ok) {
                    console.log("fetched clients:", dataClient);
                    setClients(dataClient);
                } else {
                    console.log("server error:", dataClient.error);
                }

                const responseStaff = await fetch("/api/staff/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: token
                    }
                });

                const dataStaff = await responseStaff.json();

                if (responseStaff.ok) {
                    console.log("fetched staff:", dataStaff);
                    setStaff(dataStaff);
                } else {
                    console.log("server error:", dataStaff.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

        getUsers();
    }, []);

    const createProject = async (data) => {
        // getting the client and in-charge details to pass back to the server
        data.clientId = clients?.filter((client) => client.name === data.clientId).map((client) => client.id)[0];
        data.inChargeId = staff?.filter((staff) => staff.name === data.inChargeId).map((staff) => staff.id)[0];
        data.date = new Date(data.date);
        data.budget = parseInt(data.budget);

        console.log(data);

        try {
            const response = await fetch("/api/projects/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: token
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
        <div id="new-project" className="mt-12">
            <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit(createProject)}>
                <p className="text-sky-800 mb-5 text-lg">add a new project</p>
                <label className="w-72 p-1 flex flex-col">
                    title
                    <textarea
                        {...register("title")}
                        className="bg-slate-100 px-1"
                    />
                </label>                 
                <label className="flex flex-col">
                    project type
                    <select {...register("type")} className="bg-slate-100 p-1">
                        <option>wedding</option>
                        <option>corporate</option>
                        <option>party</option>
                        <option>styled shoot</option>
                        <option>others</option>
                    </select>
                </label>
                <label className="flex flex-col items-center">
                    client
                    <select {...register("clientId")} className="bg-slate-100 p-1">
                        {
                            clients?.map((client, index) => (
                                <option key={index}>{client?.name}</option>
                            ))
                        }
                    </select>
                </label>
                <label className="flex flex-col">
                    date
                    <input
                        {...register("date")}
                        type="date"
                        className="bg-slate-100 px-1"
                    />
                </label>
                <label className="flex flex-col">
                    location
                    <textarea
                        {...register("location")}
                        className="bg-slate-100 w-72 p-1"
                    />
                </label>
                <label className="flex flex-col">
                    budget
                    <input
                        {...register("budget")}
                        type="number"
                        className="bg-slate-100 p-1"
                    />
                </label>
                <label className="flex flex-col items-center">
                    in-charge
                    <select {...register("inChargeId")} className="bg-slate-100 p-1">
                        {
                            staff?.map((staff, index) => (
                                <option key={index}>{staff?.name}</option>
                            ))
                        }
                    </select>
                </label>
                <button className="bg-sky-800 mt-10 px-5 py-2 rounded-full text-slate-50">add event</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default NewProject;