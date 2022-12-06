import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewEnquiry = () => {
    // setting up navigation
    const navigate = useNavigate();

    // setting up react hook form
    const { register, handleSubmit } = useForm();

    // function to handle enquiry submission
    const onSubmit = async (data) => {
        console.log("enquiry:", data);

        try {
            const response = await fetch("/api/enquiries/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("successfully submitted enquiry");
                toast.success("Your enquiry has been successfully submitted!", { toastId: "enquiry-success-msg" });
                document.getElementById("enquiry-form").reset();
            } else {
                console.log("server error:", data2.error);
                toast.error("Your enquiry could not be submitted, please try again", { toastId: "enquiry-fail-msg" });
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
                autoComplete="off"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="text-slate-50 flex flex-col">
                    name:
                    <input
                        required
                        id="enquiry-name-input"
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                        {...register("name")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    email:
                    <input
                        required
                        type="email"
                        id="enquiry-email-input"
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                        {...register("email")}
                    />
                </label>
                <label className="text-slate-50 flex flex-col">
                    contact number:
                    <input
                        required
                        id="enquiry-contact-input"
                        className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                        {...register("contact_number")}
                    />
                </label>
                <div className="flex gap-7">
                    <label className="text-slate-50 flex flex-col">
                        event date:
                        <input
                            required
                            type="date"
                            id="enquiry-date-input"
                            className="bg-slate-100 w-32 pl-1 text-slate-500"
                            {...register("event_date")}
                        />
                    </label>
                    <label className="text-slate-50 flex flex-col">
                        event type:
                        <select
                            className="bg-slate-100 text-slate-500 p-1 tracking-wide"
                            {...register("event_type")}
                        >
                            <option>wedding</option>
                            <option>corporate</option>
                            <option>party</option>
                            <option>others</option>
                        </select>
                    </label>
                </div>
                <label className="text-slate-50 flex flex-col">
                    event description:
                    <textarea
                        required
                        id="enquiry-description-input"
                        className="bg-slate-100 w-64 h-36 text-slate-500 p-1 tracking-wide"
                        {...register("event_description")}
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

export default NewEnquiry;