import { useState } from "react";
import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

const CheckpointTable = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [editing, setEditing] = useState("");

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
        <table>
            <thead>
                <tr>
                    <th className="border-2">date</th>
                    <th className="border-2">checkpoint</th>
                </tr>
            </thead>
            <tbody>
                {
                    project?.checkpoints?.map((checkpoint, index) => {
                        if (editing !== checkpoint.id) {
                            return (
                                <tr key={index}>
                                    <td className="px-5 border-2 text-center">{checkpoint?.date?.slice(0, 10)}</td>
                                    <td className="px-5 border-2">{checkpoint?.details}</td>
                                    <td className="px-5 flex gap-2 items-center hover:cursor-pointer">
                                        <ion-icon name="create-outline" size="large" onClick={() => setEditing(checkpoint?.id)}></ion-icon>
                                        <ion-icon name="close" size="large" onClick={() => deleteCheckpoint(checkpoint.id)}></ion-icon>
                                    </td>
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index}>
                                    <td className="px-5 py-2 border-2 text-center">
                                        <input id="checkpoint-date" type="date" defaultValue={checkpoint?.date?.slice(0, 10)} className="text-slate-900" />
                                    </td>
                                    <td className="px-5 py-2 border-2">
                                        <input id="checkpoint-details" defaultValue={checkpoint?.details} className="text-slate-900 w-full pl-1" />
                                    </td>
                                    <td className="px-5 pt-3 flex gap-2 items-center hover:cursor-pointer">
                                        <button 
                                            className="bg-slate-50 text-slate-900 px-3 rounded-full"
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