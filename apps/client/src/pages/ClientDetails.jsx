import { useState } from "react";
import { useAtom } from "jotai";
import { viewAccAtom } from "../components/AllAccounts/ClientAccounts";
import AddContact from "../components/AllAccounts/AddContact";

const ClientDetails = () => {
    const [details, setDetails] = useAtom(viewAccAtom);

    return (
        <div id="client-details" className="my-20 flex flex-col items-center gap-10">
            <div className="bg-teal-800 p-10 rounded-lg flex flex-col items-center gap-8">
                <div className="flex flex-col items-center">
                    <p className="text-slate-50 text-lg">{details?.name}</p>
                    <p className="text-slate-50 italic">{details?.email}</p>
                </div>

                {
                    details?.projects?.length === 0 ?
                    <p className="italic text-slate-50">no projects yet</p> :
                    <table>
                        <thead>
                            <tr>
                                <th className="border-2 text-slate-50">projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details?.projects?.map((project, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="px-5 py-1 border-2 text-slate-50">{project?.title}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }

                {
                    details?.contacts?.length === 0 ?
                    <p className="italic text-slate-50">no contact information available</p> :
                    <table className="mt-3">
                        <thead>
                            <tr>
                                <th colSpan={2} className="px-4 border-2 text-slate-50">contact information</th>
                            </tr>
                            <tr>
                                <th className="px-4 border-2 text-slate-50">name</th>
                                <th className="px-4 border-2 text-slate-50">contact number</th>
                            </tr>
                            </thead>
                            <tbody>
                                {
                                    details?.contacts?.map((contact, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="px-4 py-1 border-2 text-slate-50">{contact?.name}</td>
                                                <td className="px-4 py-1 border-2 text-slate-50 text-center">{contact?.contactNum}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                    </table>
                }
            </div>
            <button className="bg-teal-700 py-1 px-5 rounded-full text-slate-50">back</button>
        </div>
    )
}

export default ClientDetails;