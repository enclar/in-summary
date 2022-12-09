import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { atom, useAtom } from "jotai";
import { projectAtom } from "./Projects";
import { toast, ToastContainer } from "react-toastify";
import NewProjectForm from "../components/NewProject/NewProjectForm";

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

    return (
        <div id="new-project" className="my-12">
            <NewProjectForm />
            <ToastContainer />
        </div>
    )
}

export default NewProject;