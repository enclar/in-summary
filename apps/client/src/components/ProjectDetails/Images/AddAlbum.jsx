import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

const AddAlbum = () => {
    const [currProject, setCurrProject] = useAtom(currProjAtom);
    const { register, handleSubmit } = useForm();

    const addAlbum = async (data) => {
        data.projectId = currProject?.id;

        try {
            const response = await fetch("/api/albums/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                console.log("added album:", data2);
                setCurrProject({...currProject, albums: [...currProject.albums, data2]});
                document.getElementById("add-album-form").reset();
            } else {
                console.log("server error:", data2.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <form
            id="add-album-form"
            className="flex gap-10 justify-center items-center"
            onSubmit={handleSubmit(addAlbum)}
            autoComplete="off"
        >
            <label className="flex gap-2 text-md items-center tracking-wider text-stone-700">
                album name:
                <input {...register("name")} className="bg-orange-100 p-1" />
            </label>
            <button className="bg-teal-900 hover:bg-teal-800 text-slate-50 px-4 py-1 rounded-full italic tracking-wider">add album</button>
        </form>
    )
}

export default AddAlbum;