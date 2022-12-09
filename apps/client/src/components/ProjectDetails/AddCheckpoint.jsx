import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { checkpointAtom } from "./Timeline";

const AddCheckpoint = ({ project }) => {
    // setting up state
    const [checkpoints, setCheckpoints] = useAtom(checkpointAtom);

    // setting up react hook form
    const { register, handleSubmit } = useForm();

    // function to create a new checkpoint
    const newCheckpoint = async (data) => {
        data.date = new Date(data.date);
        data.projectId = project.id;

        console.log(data);
        try {
            const response = await fetch("/api/checkpoints/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added new checkpoint:", data2);
                setCheckpoints([...checkpoints, data2]);
                document.getElementById("add-checkpoint-form").reset();
            } else {
                console.log("server error:", data2.error);
            }
        } catch (error) {
            console.log("client error:", error)
        }
    };

    return (
        <form
            id="add-checkpoint-form"
            className="flex flex-col gap-3 items-center"
            onSubmit={handleSubmit(newCheckpoint)}
            autoComplete="off"
        >
            <legend className="text-slate-50 text-center tracking-wider text-md">add a new checkpoint</legend>
            <div className="flex gap-5 items-center">
                <label className="flex gap-2 text-slate-50">
                    date:
                    <input type="date" {...register("date")} className="text-slate-700 pl-1" required={true} />
                </label>
                <label className="flex gap-2 text-slate-50">
                    checkpoint:
                    <input {...register("details")} className="text-slate-700 pl-1" required={true} />
                </label>
                <button className="bg-slate-50 ml-2 px-5 rounded-full">add</button>
            </div>
        </form>
    )
}

export default AddCheckpoint;