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
            <textarea {...register("content")} className="bg-orange-100 w-4/5 h-48 p-2 text-sky-900" />
            <button className="bg-teal-900 hover:bg-teal-800 text-slate-50 italic tracking-wider px-5 py-1 rounded-full">add a new note</button>
        </form>
    )
}

export default AddNote;