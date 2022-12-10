import { useEffect } from "react";
import { atom, useAtom } from "jotai";

import AddTask from "./AddTask";
import TaskTable from "./TaskTable";

export const taskAtom = atom([{
    dueBy: "2022-05-03",
    description: "test task table",
    doneBy: "clarissa"
}]);

const Tasks = ({ project }) => {
    const [tasks, setTasks] = useAtom(taskAtom);

    useEffect(() => {
        const getTasks = async () => {
            const url = "/api/tasks/" + project.id
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: JSON.parse(localStorage.getItem("token"))
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched all tasks:", data);
                    setTasks(data);
                } else {
                    console.log("no tasks available for this project");
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

        // getTasks();
    }, []);

    return (
        <div id="tasks" className="flex flex-col items-center">
            {
                tasks.length === 0 ?
                <div className="bg-sky-900 p-4 rounded-lg">
                    <AddTask project={project} />
                </div>
                :
                <div className="bg-sky-900 p-4 rounded-lg flex flex-col gap-8 items-center">
                    <label className="flex flex-col items-center gap-2 text-slate-50 tracking-wider">
                        to be done
                        <TaskTable />
                    </label>
                    <AddTask project={project} />
                </div>
            }
        </div>
    )
}

export default Tasks;