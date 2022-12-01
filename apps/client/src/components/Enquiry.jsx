import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Enquiry = () => {
    // setting up navigation
    const navigate = useNavigate();

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

    // function to handle enquiry submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/enquiries/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enquiry)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully submitted enquiry")
                toast.success("Your enquiry has been submitted!", {toastId: "enquiry-success-msg"});

                setEnquiry({
                    name: "",
                    email: "",
                    contactNumber: "",
                    eventDate: "",
                    description: ""
                });

            } else {
                console.log("server error:", data.error);
                toast.error("Unable to submit your enquiry, please try again", {toastId: "enquiry-failed-msg"});
            }
        } catch (error) {
            console.log("client error:", error);
        }
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
                    thank you for enquiring with us!<br/>
                    let us know what you're looking for and we'll reach out to arrange a meeting soon
                </p>
            </div>
            <form
                id="enquiry-form"
                className="bg-sky-900 px-20 py-10 rounded-xl flex flex-col items-center justify-center gap-5"
                method="post"
                onSubmit={() => handleSubmit(event)}
            >
                <label className="text-slate-50 flex flex-col">
                    name:
                    <input
                        required
                        id="enquiry-name-input"
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
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
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                        value={enquiry.email}
                        onChange={() => handleTyping(event, "email")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    contact number:
                    <input
                        required
                        id="enquiry-contact-input"
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                        value={enquiry.contactNumber}
                        onChange={() => handleTyping(event, "contactNumber")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    event date:
                    <input
                        required
                        type="date"
                        id="enquiry-date-input"
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                        value={enquiry?.eventDate?.slice(0, 10)}
                        onChange={() => handleTyping(event, "eventDate")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    event description:
                    <textarea
                        required
                        id="enquiry-description-input"
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                        value={enquiry.description}
                        onChange={() => handleTyping(event, "description")}
                    />
                </label>
                <button
                    id="submit-enquiry-btn"
                    className="bg-slate-500 text-slate-50 mt-10 py-1 px-4 rounded-full tracking-wider hover:bg-slate-200 hover:text-slate-500"
                >
                    submit enquiry
                </button>
            </form>
            <p className="text-sky-900 text-center text-m tracking-wider">
                click{" "}
                <span
                    id="go-to-login"
                    className="underline hover:text-sky-600 hover:cursor-pointer"
                    onClick={() => navigate("/login")}
                >
                    here
                </span>
                {" "}to log in if you're an existing client!
            </p>
            <ToastContainer />
        </div>
    )
}

export default Enquiry;