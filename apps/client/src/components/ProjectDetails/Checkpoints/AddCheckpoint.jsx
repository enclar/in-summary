import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

const AddCheckpoint = () => {
    // setting up state
    const [project, setProject] = useAtom(currProjAtom);

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
                setProject(data2?.project);
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
            <legend className="text-teal-900 font-semibold italic text-center tracking-wider text-md">add a new checkpoint</legend>
            <div className="flex gap-10 items-center">
                <label className="flex gap-2 items-center text-slate-700 tracking-wider">
                    date:
                    <input type="date" {...register("date")} className="bg-orange-50 text-slate-700 p-1" required={true} />
                </label>
                <label className="flex gap-2 items-center text-slate-700 tracking-wider">
                    checkpoint:
                    <input {...register("details")} className="bg-orange-50 text-slate-700 p-1" required={true} />
                </label>
                <button className="bg-teal-900 text-slate-50 ml-2 px-5 rounded-full">add</button>
            </div>
        </form>
    )
}

export default AddCheckpoint;