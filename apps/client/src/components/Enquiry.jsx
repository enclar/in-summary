import { useState } from "react";

const Enquiry = () => {
    // setting up state
    const [enquiry, setEnquiry] = useState({
        name: "",
        email: "",
        contactNumber: "",
        eventDate: "",
        description: ""
    });

    // function to handle typing in inputs
    const handleTyping = (event, field) => {
        setEnquiry({...enquiry, [`${field}`]: event.target.value})
    };

    return (
        <div
            id="enquiry"
            className="my-24 flex flex-col items-center justify-center gap-12"
        >
            <div
                id="enquiry-legend-msg"
                className="flex flex-col gap-2"
            >
                <p className="text-sky-700 text-center text-xl tracking-wider">
                    hello!
                </p>
                <p className="text-sky-900 text-center text-m tracking-wider">
                    let us know what you're looking for and we'll follow up soon
                </p>
            </div>
            <form
                id="enquiry-form"
                className="bg-sky-900 px-20 py-10 rounded-xl flex flex-col items-center justify-center gap-5"
            >
                <label className="text-slate-50 flex flex-col">
                    name:
                    <input
                        required
                        id="enquiry-name-input"
                        className="bg-slate-100 px-1"
                        value={enquiry.name}
                        onChange={() => handleTyping(event, "name")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    email:
                    <input
                        required
                        type="email"
                        id="enquiry-email-input"
                        className="bg-slate-100 px-1"
                        value={enquiry.email}
                        onChange={() => handleTyping(event, "email")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    contact number:
                    <input
                        required
                        id="enquiry-contact-input"
                        className="bg-slate-100 px-1"
                        value={enquiry.contactNumber}
                        onChange={() => handleTyping(event, "contactNumber")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    event date:
                    <input
                        required
                        type="date"
                        id="enquiry-contact-input"
                        className="bg-slate-100 text-slate-900 px-1"
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    event description:
                    <textarea
                        required
                        id="enquiry-contact-input"
                        className="bg-slate-100 px-1"
                        value={enquiry.contactNumber}
                        onChange={() => handleTyping(event, "contactNumber")}
                    />
                </label>
                <button
                    className="bg-slate-500 text-slate-50 mt-10 py-1 px-4 rounded-full tracking-wider hover:bg-slate-200 hover:text-slate-500"
                >
                    submit enquiry
                </button>
            </form>
        </div>
    )
}

export default Enquiry;