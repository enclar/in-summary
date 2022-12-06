import { atom, useAtom } from "jotai";
import { useEffect } from "react";

export const enquiriesAtom = atom([]);

const Enquiries = () => {
    const [enquiries, setEnquiries] = useAtom(enquiriesAtom);

    useEffect(() => {
        const getEnquiries = async () => {
            try {
                const response = await fetch("/api/enquiries/get-all", {
                    method: "GET",
                    
                })
            }
        }
    });

    return (
        <div id="enquiries">
            enquiries page
        </div>
    )
}

export default Enquiries;