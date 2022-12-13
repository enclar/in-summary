import { useState } from "react";
import { currProjAtom } from "../../Projects/ProjectTableRow";
import { staffAtom } from "../../../pages/NewProject";
import { useAtom } from "jotai";

const TaskTable = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [staff] = useAtom(staffAtom);
    const [editing, setEditing] = useState("");

    // function to update task
    const editTask = async () => {
        const editedTask = {
            description: document.getElementById("task-description").value,
            dueBy: new Date(document.getElementById("task-date").value),
            doneBy: document.getElementById("task-person").value
        }

        const url = "/api/tasks/update/" + editing;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(editedTask)
            });

            const data= await response.json();

            if (response.ok) {
                console.log("updated task:", data);
                setProject(data?.project);
                setEditing("");
            } else {
                console.log("server error:", data.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    }

    return (
        <table id="task-table">
            <thead>
                <tr>
                    <th className="border-2">due by</th>
                    <th className="border-2">task</th>
                    <th className="border-2 px-5">action from</th>
                    <th className="border-2 px-5">complete?</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    project?.tasks?.map((task, index) => {
                        if (editing !== task.id) {
                            return (
                                <tr key={index}>
                                    <td className="px-3 border-2">{task?.dueBy?.slice(0, 10)}</td>
                                    <td className="px-3 w-2/5 border-2">{task?.description}</td>
                                    <td className="px-3 border-2 text-center">{task?.doneBy}</td>
                                    <td className="px-3 border-2 text-center">
                                        <input type="checkbox" checked={task?.completed ? true : false } disabled={task?.completed ? true : false } />
                                    </td>
                                    {
                                        task?.completed ?
                                        <></> :
                                        <td className="pl-5 w-full flex gap-1 items-center hover:cursor-pointer">
                                            <ion-icon name="create-outline" size="large" onClick={() => setEditing(task?.id)}></ion-icon>
                                            <ion-icon name="close" size="large"></ion-icon>
                                        </td>
                                    }
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index}>
                                    <td className="p-3 border-2">
                                        <input type="date" id="task-date" defaultValue={task?.dueBy?.slice(0, 10)} className="text-slate-900" />
                                    </td>

                                    <td className="p-3 w-2/5 border-2">
                                        <input id="task-description" defaultValue={task?.description} className="text-slate-900 w-full" />
                                    </td>

                                    <td className="p-3 border-2 text-center">
                                        <select id="task-person" className="text-slate-700 p-1 bg-slate-50" defaultValue={task?.doneBy}>
                                            <option>{project?.client?.name}</option>
                                            { staff?.map((staff, index) => <option key={index}>{staff?.name}</option>) }
                                        </select>
                                    </td>
                                    <td className="p-3 border-2 text-center">
                                        <input type="checkbox" checked={false} disabled={true} />
                                    </td>
                                    <td className="p-3 text-center">
                                        <button className="bg-slate-50 text-sky-900 px-3 rounded-full">update</button>
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

export default TaskTable;