import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { clientAtom } from "../../pages/NewProject";
import { useAtom } from "jotai";

const NewClientForm = () => {
    // react hook form
    const { register, handleSubmit } = useForm();

    // setting up jotai
    const [clients, setClients] = useAtom(clientAtom);

    // function to add new client
    const newClient = async (data) => {
        console.log("all data:", data);

        const client = {
            name: data.name,
            email: data.email,
            password: data.password,
            isCompany: data.isCompany
        };

        const contact = { name: data.contactNum, contactNum: data.contactNum };

        try {
            const response = await fetch("/client/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify({ client: client, contact: contact })
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added new client:", data2);
                setClients([...clients, data2]);
                document.getElementById("new-staff-form").reset();
                toast.success(`New client account added for ${data2.name}`);
            } else {
                console.log("server error:", data2.error);
                toast.error("Unable to add new staff account, please try again");
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <form
            id="new-client-form"
            className="flex flex-col items-center gap-5"
            method="post"
            onSubmit={handleSubmit(newClient)}
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

            <label className="flex gap-1">
                <input type="checkbox" {...register("isCompany")} className="bg-slate-200" />
                this client is a company
            </label>

            <button className="bg-sky-900 mt-5 px-5 py-1 rounded-full text-slate-50">add new client</button>
        </form>
    )
}

export default NewClientForm;