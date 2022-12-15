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

        const contact = { name: data.contactName, contactNum: data.contactNum };

        try {
            const response = await fetch("/api/clients/new", {
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
                document.getElementById("new-client-form").reset();
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
            className="flex flex-col items-center gap-5 w-full"
            method="post"
            onSubmit={handleSubmit(newClient)}
            autoComplete="off"
        >
            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                client name
                <input {...register("name")} className="bg-slate-200 px-1" required />
            </label>

            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                email
                <input {...register("email")} className="bg-slate-200 px-1" required />
            </label>

            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                password
                <input type="password" {...register("password")} className="bg-slate-200 px-1" required />
            </label>

            <label className="text-center my-5 w-3/5 text-teal-900 tracking-wider italic font-semibold">
                main contact person
                <div className="flex flex-col items-center gap-5 w-full">
                    <label className="w-full flex flex-col text-left text-slate-700 tracking-wider not-italic font-normal">
                        name
                        <input {...register("contactName")} className="bg-slate-200 px-1" />
                    </label>
                    <label className="w-full flex flex-col text-left text-slate-700 tracking-wider not-italic font-normal">
                        contact number
                        <input {...register("contactNum")} className="bg-slate-200 px-1" />
                    </label>
                </div>
            </label>

            <label className="flex gap-1">
                <input type="checkbox" {...register("isCompany")} className="bg-slate-200" />
                this client is a company
            </label>

            <button className="bg-teal-900 mt-5 px-5 py-1 rounded-full text-slate-50">add new client</button>
        </form>
    )
}

export default NewClientForm;