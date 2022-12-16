import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { clientAtom } from "../../pages/NewProject";
import ClientDetails from "./ClientDetails";

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
        // navigate(`/clients/${details.id}`);
    }

    return (
        <div className="flex gap-20 items-start">
                <table id="client-accounts" className="not-italic">
                    <thead>
                        <tr className="bg-lime-900/40 text-slate-50 italic tracking-wider">
                            <th className="px-5 py-3 border-r-4">name</th>
                            <th className="px-5 py-3">email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients?.map((client, index) => {
                                return (
                                    <tr key={index} className="hover:bg-orange-50 hover:cursor-pointer text-stone-500">
                                        <td className="px-5 py-2 border-2 border-lime-900/40 text-center" onClick={() => viewDetails(client)}>{client?.name}</td>
                                        <td className="px-5 py-2 border-2 border-lime-900/40 text-center">{client?.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

            {
                Object.keys(viewAcc).length === 0 ?
                <></> :
                <ClientDetails />
            }
        </div>

    )
}

export default ClientAccounts;