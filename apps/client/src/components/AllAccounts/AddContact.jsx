import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { viewAccAtom } from "./ClientAccounts";

const AddContact = () => {
    const [details, setDetails] = useAtom(viewAccAtom);
    const { register, handleSubmit } = useForm();

    // function to add new contact
    const addContact = async (data) => {
        const url = "/api/clients/add-contact/" + details.id
        console.log(data);

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("updated client details:", data2);
                setDetails(data2);
                document.getElementById("add-contact-form").reset();
            } else {
                console.log("server error:", data2.error);
            }

        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <form
            id="add-contact-form"
            className="bg-slate-50 p-3 rounded-md flex flex-col items-center gap-2"
            onSubmit={handleSubmit(addContact)}
        >
            <label className="flex flex-col">
                name
                <input {...register("name")} className="bg-teal-700 px-1 text-slate-50" required />
            </label>
            <label className="flex flex-col">
                contact number
                <input {...register("contactNum")} className="bg-teal-700 px-1 text-slate-50" required />
            </label>
            <button className="bg-teal-700 mt-3 py-1 px-3 rounded-full text-slate-50">add new contact</button>
        </form>
    )
}

export default AddContact;