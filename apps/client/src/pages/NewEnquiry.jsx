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
        data = {
            ...data,
            date: new Date(data.date)
        }

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
            className="p-20 min-h-screen font-serif flex flex-col items-center justify-center"
        >
            <div
                id="enquiry-legend-msg"
                className="flex flex-col gap-2 w-2/5 p-5 border-double border-8 border-teal-900 rounded-t-3xl bg-orange-50/60"
            >
                <p className="text-teal-900 text-center text-2xl font-bold italic tracking-wider">
                    hello!
                </p>
                <p className="text-slate-700 text-center text-lg tracking-wider">
                    thank you for enquiring with us!<br/>
                    let us know what you're looking for and we'll reach out to arrange a meeting soon!
                </p>
            </div>

            <form
                id="enquiry-form"
                className="w-2/5 bg-slate-50/40 p-10 border-4 border-t-0 border-teal-900 flex flex-col items-center justify-center gap-5 rounded-b-3xl"
                autoComplete="off"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="text-teal-900 w-3/5 text-lg tracking-wider flex flex-col">
                    name
                    <input
                        required
                        id="enquiry-name-input"
                        className="bg-orange-100 text-slate-700 p-1 tracking-wide"
                        {...register("name")}
                    />
                </label>

                <label className="text-teal-900 w-3/5 text-lg tracking-wider flex flex-col">
                    email
                    <input
                        required
                        type="email"
                        id="enquiry-email-input"
                        className="bg-orange-100 text-slate-700 p-1 tracking-wide"
                        {...register("email")}
                    />
                </label>

                <label className="text-teal-900 w-3/5 text-lg tracking-wider flex flex-col">
                    contact number
                    <input
                        required
                        id="enquiry-contact-input"
                        className="bg-orange-100 text-slate-700 p-1 tracking-wide"
                        {...register("contactNum")}
                    />
                </label>

                <div className="flex w-2/5 justify-around">
                    <label className="text-teal-900 text-lg tracking-wider flex flex-col">
                        event date
                        <input
                            required
                            type="date"
                            id="enquiry-date-input"
                            className="bg-orange-100 w-32 pl-1 text-slate-700"
                            {...register("date")}
                        />
                    </label>

                    <label className="text-teal-900 text-lg tracking-wider flex flex-col">
                        event type
                        <select
                            className="bg-orange-100 text-slate-700 p-1 tracking-wide"
                            {...register("type")}
                        >
                            <option>wedding</option>
                            <option>corporate</option>
                            <option>party</option>
                            <option>others</option>
                        </select>
                    </label>
                </div>
                <label className="text-teal-900 w-3/5 text-lg tracking-wider flex flex-col">
                    event description
                    <textarea
                        required
                        id="enquiry-description-input"
                        className="bg-orange-100 w-full h-36 text-slate-700 p-1 tracking-wide"
                        {...register("description")}
                    />
                </label>
                <button
                    id="submit-enquiry-btn"
                    className="bg-teal-900 text-slate-50 mt-10 py-1 px-4 rounded-full tracking-widest italic hover:bg-teal-800"
                >
                    submit enquiry
                </button>

                <p className="text-teal-900 text-center mt-5 font-bold text-lg tracking-widest italic">
                    click{" "}
                    <span
                        id="go-to-login"
                        className="underline hover:text-teal-600 hover:cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        here
                    </span>
                    {" "}to log in if you're an existing client!
                </p>
            </form>

            <ToastContainer />
        </div>
    )
}

export default NewEnquiry;