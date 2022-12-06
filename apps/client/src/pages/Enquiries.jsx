import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import Enquiry from "../components/Enquiries/Enquiry";

export const enquiriesAtom = atom([]);

const Enquiries = () => {
    const [enquiries, setEnquiries] = useAtom(enquiriesAtom);

    // fetching all enquiries
    useEffect(() => {
        const getEnquiries = async () => {
            try {
                const response = await fetch("/api/enquiries/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                
                if (response.ok) {
                    console.log("successfully fetches all enquiries:", data);
                    setEnquiries(data);
                } else {
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        }

        getEnquiries();
    }, []);

    return (
        <div id="enquiries" className="py-16">
            <p className="text-sky-800 text-xl text-center">enquiries</p>
            <div id="enquiry container">
            </div>
            <table className="mt-10">
                <thead>
                    <tr>
                        <th className="bg-sky-800 px-5 text-slate-50">name</th>
                        <th className="bg-sky-600 px-5 text-slate-50">contact details</th>
                        <th className="bg-sky-800 px-5 text-slate-50">event date</th>
                        <th className="bg-sky-600 px-5 text-slate-50">event type</th>
                        <th className="bg-sky-800 px-5 text-slate-50">event description</th>
                        <th className="bg-sky-600 px-5 text-slate-50">follow up?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        enquiries?.map((enquiry, index) => {
                            return (
                                <Enquiry enquiry={enquiry} key={index} />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Enquiries;