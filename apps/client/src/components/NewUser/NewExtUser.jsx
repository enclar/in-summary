import { useState } from "react";
import { useForm } from "react-hook-form";

const NewExtUser = () => {
    const [contact, setContact] = useState({
        name: "",
        contact: ""
    });

    const handleTyping = (event, field) => {
        setContact({...contact, [`${field}`]: event.target.value});
    };

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        data.details = [contact];
        console.log(data);
    };

    return (
        <form
            id="new-ext-user-form"
            className="mt-8 flex flex-col items-center gap-4"
            autoComplete="off"
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

            <section className="my-8 flex flex-col items-center gap-4">
                <legend className="text-center">contact person</legend>
                <label className="flex flex-col">
                    name:
                    <input
                        className="bg-slate-100 px-1 w-auto"
                        value={contact.name}
                        onChange={() => handleTyping(event, "name")}
                    />
                </label>
                <label className="flex flex-col">
                    contact number:
                    <input
                        className="bg-slate-100 px-1 w-auto"
                        value={contact.contact}
                        onChange={() => handleTyping(event, "contact")}
                    />
                </label>
            </section>

            <label className="mt-2 flex gap-2 items-center">
                account type:
                <select {...register("accountType")}>
                    <option value="client">client</option>
                    <option value="vendor">vendor</option>
                    <option value="other">other</option>
                </select>
            </label>

            <label className="flex gap-2">
                <input
                    type="checkbox"
                    {...register("company")}
                />
                this is a company
            </label>

            <button className="bg-sky-900 px-8 py-2 mt-8 rounded-full text-slate-50 hover:text-sky-200">
                create account
            </button>
        </form>
    )
}

export default NewExtUser;