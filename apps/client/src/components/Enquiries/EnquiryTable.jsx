import { enquiriesAtom } from "../../pages/Enquiries";
import { useAtom } from "jotai";

const EnquiryTable = () => {
    const [enquiries, setEnquiries] = useAtom(enquiriesAtom);

    // function to follow up on enquiry
    const followUp = async (enquiry_id) => {
        const currUser = JSON.parse(localStorage.getItem("currUser"));
        const url ="/api/enquiries/update/" + enquiry_id;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify({ staffId: currUser.id })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("updated enquiry:", data);
                const updatedEnquiries = enquiries?.filter((enquiry) => enquiry.id !== data.id);
                updatedEnquiries.push(data);
                setEnquiries(updatedEnquiries);
            }
        } catch (error) {
            console.log("client error:", error)
        }
    };

    return (
        <table id="enquiry-table" className="w-4/5">
            <thead>
                <tr>
                    <th className="px-5 border-2">name</th>
                    <th className="px-5 border-2">contact details</th>
                    <th className="px-5 border-2">date</th>
                    <th className="px-5 border-2">type</th>
                    <th className="px-5 border-2">details</th>
                    <th className="px-5 border-2">follow up?</th>
                </tr>
            </thead>
            <tbody>
                {
                    enquiries?.map((enquiry, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-5 border-2">{enquiry?.name}</td>
                                <td className="px-5 border-2 text-center">{enquiry?.contactNum}<br />{enquiry?.email}</td>
                                <td className="px-5 border-2">{enquiry?.date?.slice(0, 10)}</td>
                                <td className="px-5 border-2 text-center">{enquiry?.type}</td>
                                <td className="px-5 w-2/5 border-2">{enquiry?.description}</td>
                                {
                                    enquiry?.followUp?
                                    <td className="px-5 border-2 text-center">{enquiry?.followUpBy?.name}</td> :
                                    <td className="px-5 border-2">
                                        <input type="checkbox" onClick={() => followUp(enquiry?.id)} />
                                    </td>
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default EnquiryTable;