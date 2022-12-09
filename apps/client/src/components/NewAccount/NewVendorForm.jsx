import { useAtom, atom } from "jotai"
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const NewVendorForm = () => {
    // setting up react hook form
    const { register, handleSubmit } = useForm();

    // function to create new vendor
    const newVendor = async (data) => {
        console.log("all data:", data);

        const vendor = {
            name: data.name,
            email: data.email,
            password: data.password
        };

        const contact = { name: data.contactName, contactNum: data.contactNum };

        try {
            const response = await fetch("/api/vendors/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify({ vendor: vendor, contact: contact })
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added new vendor:", data2);
                document.getElementById("new-vendor-form").reset();
                toast.success(`New vendor account added for ${data2.name}`);
            } else {
                console.log("server error:", data2.error);
                toast.error("Unable to add new vendor account, please try again");
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <form
            id="new-vendor-form"
            className="flex flex-col items-center gap-5"
            method="post"
            onSubmit={handleSubmit(newVendor)}
            autoComplete="off"
        >
            <label className="flex flex-col">
                account name
                <input {...register("name")} className="bg-slate-200 px-1" required />
            </label>

            <label className="flex flex-col">
                email
                <input {...register("email")} className="bg-slate-200 px-1" required />
            </label>

            <label className="flex flex-col">
                password
                <input type="password" {...register("password")} className="bg-slate-200 px-1" required />
            </label>

            <label className="text-center my-5">
                main contact person
                <div className="mt-3 flex flex-col gap-5">
                    <label className="text-left flex flex-col">
                        name
                        <input {...register("contactName")} className="bg-slate-200 px-1" />
                    </label>
                    <label className="text-left flex flex-col">
                        contact number
                        <input {...register("contactNum")} className="bg-slate-200 px-1" />
                    </label>
                </div>
            </label>

            <button className="bg-sky-900 mt-5 px-5 py-1 rounded-full text-slate-50">add new vendor</button>
        </form>
    )
}

export default NewVendorForm;