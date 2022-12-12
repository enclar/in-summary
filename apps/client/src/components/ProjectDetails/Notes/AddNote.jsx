import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

const AddNote = () => {
    const [project, setProject] = useAtom(currProjAtom);
    
    const { register, handleSubmit } = useForm();

    const addNote = async (data) => {
        data.projectId = project.id;
        console.log("data:", data);

        try {
            const response = await fetch("/api/notes/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added new note:", data2);
                setProject({...project, notes: [...project?.notes, data2]});
                document.getElementById("add-note").reset();
            } else {
                console.log("server error:", data2.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <form
            id="add-note"
            className="w-full flex flex-col items-center gap-5"
            onSubmit={handleSubmit(addNote)}
        >
            <label className="text-slate-50 w-full tracking-wider flex flex-col items-center gap-2">
                add a new note
                <textarea {...register("content")} className="w-4/5 h-48 p-2 text-sky-900" />
            </label>
            <button className="bg-slate-50 px-5 rounded-full">add</button>
        </form>
    )
}

export default AddNote;