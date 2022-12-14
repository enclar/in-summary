import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { staffAtom } from "../../pages/NewProject";
import { toast } from "react-toastify";

const NewStaffForm = () => {
    // setting up staffAtom
    const [staff, setStaff] = useAtom(staffAtom);

    // setting up react hook form
    const { register, handleSubmit } = useForm();

    // function to create new staff
    const newStaff = async (data) => {
        console.log("new staff:", data);

        try {
            const response = await fetch("/api/staff/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added new staff account:", data2);
                setStaff([...staff, data2]);
                document.getElementById("new-staff-form").reset();
                toast.success(`New staff account added for ${data2.name}`);
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
            id="new-staff-form"
            className="flex flex-col items-center gap-5 w-full"
            method="post" 
            onSubmit={handleSubmit(newStaff)} 
            autoComplete="off"
        >
            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                name
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

            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                contact number
                <input {...register("contactNum")} className="bg-slate-200 px-1" required />
            </label>

            <label className="flex gap-2 text-slate-700 tracking-wider">
                <input type="checkbox" {...register("isAdmin")} className="bg-slate-200" />
                admin
            </label>

            <button className="bg-teal-900 mt-5 px-5 py-1 rounded-full tracking-widest italic text-slate-50">add new staff</button>
        </form>
    )
}

export default NewStaffForm;