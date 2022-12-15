import { useState } from "react";
import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

const CheckpointTable = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [editing, setEditing] = useState("");

    const user = JSON.parse(localStorage.getItem("currUser"));

    // function to delete checkpoint
    const deleteCheckpoint = async (checkpoint_id) => {
        const url = "/api/checkpoints/delete/" + checkpoint_id
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log("deleted checkpoint:", data);
                const filtered = project?.checkpoints?.filter((checkpoint) => checkpoint.id !== data.id);
                setProject({...project, checkpoints: filtered});
            } else {
                console.log("server error:", data.error);
            }
        } catch (error) {
            console.log("client error:", error)
        }
    };

    // function to update checkpoint
    const editCheckpoint = async () => {
        const editedCheckpoint = {
            date: new Date(document.getElementById("checkpoint-date").value),
            details: document.getElementById("checkpoint-details").value
        }

        const url = "/api/checkpoints/update/" + editing;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(editedCheckpoint)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("updated checkpoint:", data?.project);
                setEditing("");
                setProject(data?.project);
            } else {
                console.log("server error:", data?.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <table className="w-full">
            <thead>
                <tr className="text-teal-900 italic tracking-wider">
                    <th className="border-2 py-1">date</th>
                    <th className="border-2 py-1">checkpoint</th>
                </tr>
            </thead>
            <tbody>
                {
                    project?.checkpoints?.map((checkpoint, index) => {
                        if (editing !== checkpoint.id) {
                            return (
                                <tr key={index}>
                                    <td className="px-10 py-1 border-2 text-center text-slate-700">{checkpoint?.date?.slice(0, 10)}</td>
                                    <td className="px-10 py-1 border-2 text-slate-700">{checkpoint?.details}</td>
                                    <td className="px-5 flex gap-2 items-center justify-center hover:cursor-pointer">
                                        <ion-icon name="create-outline" size="large" style={{ color: "darkGrey"}} onClick={() => setEditing(checkpoint?.id)}></ion-icon>
                                        <ion-icon name="close" size="large" style={{ color: "darkGrey"}} onClick={() => deleteCheckpoint(checkpoint.id)}></ion-icon>
                                    </td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index}>
                                    <td className="px-5 py-2 border-2 text-center">
                                        <input id="checkpoint-date" type="date" defaultValue={checkpoint?.date?.slice(0, 10)} className="bg-orange-50 p-1 text-slate-900" />
                                    </td>

                                    <td className="px-5 py-2 border-2">
                                        <input id="checkpoint-details" defaultValue={checkpoint?.details} className="bg-orange-50 text-slate-900 w-full p-1" />
                                    </td>
                                    
                                    <td className="px-5 pt-3 flex gap-2 items-center hover:cursor-pointer">
                                        <button 
                                            className="bg-teal-900 text-slate-50 px-3 tracking-wider rounded-full"
                                            onClick={editCheckpoint}
                                        >save changes</button>
                                    </td>
                                </tr>
                            )
                        }
                        
                    })
                }
            </tbody>
        </table>
    )
}

export default CheckpointTable;