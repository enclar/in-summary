import { useState } from "react";
import { useAtom } from "jotai";
import { viewAccAtom } from "./ClientAccounts";
import AddContact from "./AddContact";

const ClientDetails = () => {
    const [details, setDetails] = useAtom(viewAccAtom);

    return (
        <div id="client-details" className="flex flex-col items-center gap-10">
            <div className="bg-orange-100 p-10 rounded-lg flex flex-col items-center gap-8">
                <div className="flex flex-col items-center">
                    <p className="text-teal-900 text-lg tracking-wider font-semibold">{details?.name}</p>
                    <p className="text-teal-900 italic tracking-wider">{details?.email}</p>
                </div>

                {
                    details?.projects?.length === 0 ?
                    <p className="italic text-stone-500">no projects yet</p> :
                    <table>
                        <thead>
                            <tr>
                                <th className="text-slate-50 italic bg-lime-900/40">projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details?.projects?.map((project, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="px-5 py-1 border-2 border-stone-400 text-stone-500">{project?.title}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }

                {
                    details?.contacts?.length === 0 ?
                    <p className="italic text-stone-500">no contact information available</p> :
                    <table className="mt-3">
                        <thead>
                            <tr>
                                <th colSpan={2} className="px-4 text-slate-50 italic bg-lime-900/40">contact information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details?.contacts?.map((contact, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="px-5 py-1 border-2 border-stone-400 text-stone-500">{contact?.name}</td>
                                            <td className="px-5 py-1 border-2 border-stone-400 text-stone-500">{contact?.contactNum}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}

export default ClientDetails;