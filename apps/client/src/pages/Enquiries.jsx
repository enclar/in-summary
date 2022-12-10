import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import EnquiryTable from "../components/Enquiries/EnquiryTable";

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
                        'Content-Type': 'application/json',
                        token: JSON.parse(localStorage.getItem("token"))
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
        <div id="enquiries" className="my-20 flex flex-col items-center">
            <EnquiryTable enquiries={enquiries} />
        </div>
    )
}

export default Enquiries;