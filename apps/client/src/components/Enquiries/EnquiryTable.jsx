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
                const index = enquiries?.map(enquiry => enquiry.id).indexOf(data.id);
                const updatedEnquiries = enquiries?.map(enquiry => enquiry)
                updatedEnquiries[index] = data;
                setEnquiries(updatedEnquiries);
            }
        } catch (error) {
            console.log("client error:", error)
        }
    };

    return (
        <table id="enquiry-table" className="w-4/5">
            <thead>
                <tr className="bg-lime-900/40 text-stone-50 italic tracking-widest font-serif">
                    <th className="px-5 py-2 border-r-4">name</th>
                    <th className="px-5 py-2 border-r-4">contact details</th>
                    <th className="px-5 py-2 border-r-4">date</th>
                    <th className="px-5 py-2 border-r-4">type</th>
                    <th className="px-5 py-2 border-r-4">details</th>
                    <th className="px-5 py-2">follow up?</th>
                </tr>
            </thead>
            <tbody>
                {
                    enquiries?.map((enquiry, index) => {
                        return (
                            <tr key={index} className="border-b-2 border-lime-900/40 font-serif tracking-wider text-slate-600">
                                <td className="px-5 py-2 border-x-2 border-lime-900/40 text-center">{enquiry?.name}</td>
                                <td className="px-5 py-2 border-r-2 border-lime-900/40 text-center">{enquiry?.contactNum}<br />{enquiry?.email}</td>
                                <td className="px-5 py-2 border-r-2 border-lime-900/40 text-center">{enquiry?.date?.slice(0, 10)}</td>
                                <td className="px-5 py-2 border-r-2 border-lime-900/40 text-center">{enquiry?.type}</td>
                                <td className="px-5 py-2 w-2/5 border-r-2 border-lime-900/40">{enquiry?.description}</td>
                                {
                                    enquiry?.followUp?
                                    <td className="px-5 py-2 text-center border-r-2 border-lime-900/40">{enquiry?.followUpBy?.name}</td> :
                                    <td className="px-5 py-2 text-center align-middle border-r-2 border-lime-900/400">
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