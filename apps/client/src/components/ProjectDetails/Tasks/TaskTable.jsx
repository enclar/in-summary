import { useState } from "react";
import { currProjAtom } from "../../Projects/ProjectTableRow";
import { staffAtom } from "../../../pages/NewProject";
import { useAtom } from "jotai";

const TaskTable = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [staff] = useAtom(staffAtom);
    const [editing, setEditing] = useState("");
    const user = JSON.parse(localStorage.getItem("currUser"));

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

    // function to complete a task
    const completeTask = async (id) => {
        const url = "/api/tasks/complete/" + id;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify({ completed: true })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("completed task:", data);
                setProject(data?.project);
            } else {
                console.log("server error:", data.error)
            }
        } catch (error) {
            console.log("client error:", error);
        }
    }

    // function to delete a task
    const deleteTask = async (id) => {
        const url = "/api/tasks/delete/" + id;

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
                console.log("deleted task:", data);
                const filtered = project?.tasks?.filter(task => task.id !== data.id);
                setProject({...project, tasks: filtered});
            } else {
                console.log("server error:", data?.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    }

    return (
        <table id="task-table">
            <thead>
                <tr className="text-teal-900 italic tracking-wider">
                    <th className="border-2 py-1 border-stone-400/75">due by</th>
                    <th className="border-2 py-1 border-stone-400/75">task</th>
                    <th className="border-2 py-1 px-5 border-stone-400/75">action from</th>
                    <th className="border-2 py-1 px-5 border-stone-400/75">complete?</th>
                </tr>
            </thead>
            <tbody>
                {
                    project?.tasks?.map((task, index) => {
                        if (editing !== task.id) {
                            return (
                                <tr key={index}>
                                    <td className="px-5 py-1 border-2 text-center text-slate-700 border-stone-400/75">{task?.dueBy?.slice(0, 10)}</td>

                                    <td className="px-5 py-1 border-2 text-slate-700 border-stone-400/75">{task?.description}</td>

                                    <td className="px-5 py-1 border-2 text-center text-slate-700 border-stone-400/75">{task?.doneBy}</td>

                                    <td className="px-3 border-2 text-center border-stone-400/75">
                                        <input
                                            type="checkbox"
                                            checked={task?.completed ? true : false }
                                            onChange={() => completeTask(task.id)}
                                            disabled={task?.completed ? true : false }
                                        />
                                    </td>
                                    {
                                        task?.completed || user?.accType !== "staff" ?
                                        <></> :
                                        <td className="pl-5 w-full flex gap-1 items-center hover:cursor-pointer">
                                            <ion-icon name="create-outline" size="large" style={{ color: "darkGrey" }} onClick={() => setEditing(task?.id)}></ion-icon>
                                            <ion-icon name="close" size="large" style={{ color: "darkGrey" }} onClick={() => deleteTask(task.id)}></ion-icon>
                                        </td>
                                    }
                                </tr>
                            )
                        } else {
                            return (
                                <tr key={index}>
                                    <td className="p-3 border-2 border-stone-400/75">
                                        <input type="date" id="task-date" defaultValue={task?.dueBy?.slice(0, 10)} className="bg-orange-100 p-1 text-slate-900" />
                                    </td>

                                    <td className="p-3 w-2/5 border-2 border-stone-400/75">
                                        <input id="task-description" defaultValue={task?.description} className="bg-orange-100 text-slate-900 w-full p-1" />
                                    </td>

                                    <td className="p-3 border-2 border-stone-400/75 text-center">
                                        <select id="task-person" className="bg-orange-100 p-1 text-slate-900" defaultValue={task?.doneBy}>
                                            <option>{project?.client?.name}</option>
                                            { staff?.map((staff, index) => <option key={index}>{staff?.name}</option>) }
                                        </select>
                                    </td>

                                    <td className="p-3 border-2 border-stone-400/75 text-center">
                                        <input type="checkbox" defaultChecked={false} disabled={true} />
                                    </td>
                                    
                                    <td className="p-3 text-center">
                                        <button
                                        className="bg-teal-900 hover:bg-teal-800 italic text-slate-50 px-3 tracking-wider rounded-full"
                                            onClick={editTask}
                                        >update</button>
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