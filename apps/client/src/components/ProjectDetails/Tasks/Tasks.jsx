import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

import AddTask from "./AddTask";
import TaskTable from "./TaskTable";

const Tasks = () => {
    const [project, setProject] = useAtom(currProjAtom);

    return (
        <div id="tasks" className="bg-sky-900 w-4/5 p-4 rounded-lg flex flex-col items-center">
            {
                project?.tasks?.length === 0 ?
                <AddTask />
                :
                <div className="flex flex-col gap-8 items-center">
                    <label className="flex flex-col items-center gap-2 text-slate-50 tracking-wider">
                        to be done
                        <TaskTable />
                    </label>
                    <AddTask />
                </div>
            }
        </div>
    )
}

export default Tasks;