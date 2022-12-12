import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { toast, ToastContainer } from "react-toastify";
import NewProjectForm from "../components/NewProject/NewProjectForm";

export const staffAtom = atom([]);
export const clientAtom = atom([]);

const NewProject = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    // setting up jotai
    const [clients, setClients] = useAtom(clientAtom);

    // useEffect to fetch all the neccessary accounts
    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await fetch("/api/clients/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: token
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched clients:", data);
                    setClients(data);
                } else {
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

        getClients();
    }, []);

    return (
        <div id="new-project" className="my-12">
            <NewProjectForm />
            <ToastContainer />
        </div>
    )
}

export default NewProject;