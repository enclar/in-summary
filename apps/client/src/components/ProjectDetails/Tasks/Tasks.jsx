import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

import AddTask from "./AddTask";
import TaskTable from "./TaskTable";

const Tasks = () => {
    const [project, setProject] = useAtom(currProjAtom);

    return (
        <div id="tasks" className="p-10 w-full border-4 font-serif flex flex-col gap-2 items-center">
            <p className=" text-teal-900 text-xl tracking-widest font-bold italic border-double border-4 py-2 px-10">tasks to be done</p>
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