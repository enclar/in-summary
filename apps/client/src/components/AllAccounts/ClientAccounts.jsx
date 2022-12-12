import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { clientAtom } from "../../pages/NewProject";

export const viewAccAtom = atom({});

const ClientAccounts = () => {
    // setting up navigation
    const navigate = useNavigate();

    // setting up state with jotai
    const [clients, setClients] = useAtom(clientAtom);
    const [viewAcc, setViewAcc] = useAtom(viewAccAtom);

    // function to fetch all staff accounts
    useEffect(() => {
        const getClients = async () => {
            try {
                const response = await fetch("/api/clients/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: JSON.parse(localStorage.getItem("token"))
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched all clients:", data);
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

    // function to view more details
    const viewDetails = (details) => {
        setViewAcc(details);
        navigate(`/clients/${details.id}`);
    }

    return (
        <table id="client-accounts">
            <thead>
                <tr>
                    <th className="px-5 border-2">name</th>
                    <th className="px-5 border-2">email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    clients?.map((client, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-5 border-2 text-center">{client?.name}</td>
                                <td className="px-5 border-2 text-center">{client?.email}</td>
                                <td
                                    className="pl-3 text-teal-800 hover:underline hover:cursor-pointer"
                                    onClick={() => viewDetails(client)}
                                >
                                    view more details
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default ClientAccounts;