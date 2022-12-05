import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const NewStaff = () => {
    const { register, handleSubmit } = useForm();

    // function to handle creation of new staff
    const onSubmit = async (data) => {
        data.accountType = "staff";
        console.log("new staff:", data);

        try {
            const response = await fetch("/api/users/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("successfully added new staff");
                toast.success(`Successfully created staff account for ${data2.username}`);
            } else {
                console.log("server error:", data2.error);
                toast.error("Unable to create new staff account")
            }
        } catch (error) {
            console.log("client error:", error)
        }
    };

    return (
        <>
            <form
                id="new-staff-form"
                className="mt-8 flex flex-col items-center gap-4"
                autoComplete="off"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="flex flex-col">
                    username:
                    <input
                        {...register("username")}
                        required={true}
                        className="bg-slate-100 px-1"
                    />
                </label>
                <label className="flex flex-col">
                    email:
                    <input
                        {...register("email")}
                        required={true}
                        className="bg-slate-100 px-1"
                    />
                </label>
                <label className="flex flex-col">
                    password:
                    <input
                        {...register("password")}
                        type="password"
                        required={true}
                        className="bg-slate-100 px-1"
                    />
                </label>
                <label className="flex flex-col">
                    contact:
                    <input
                        {...register("contact")}
                        required={true}
                        className="bg-slate-100 px-1"
                    />
                </label>
                <label className="mt-4 flex gap-1">
                    <input
                        type="checkbox"
                        {...register("admin")}
                    />
                    admin
                </label>
                <button className="bg-sky-900 px-8 py-2 mt-8 rounded-full text-slate-50 hover:text-sky-200">
                    create account
                </button>
            </form>
            <ToastContainer />
        </>
    )
}

export default NewStaff