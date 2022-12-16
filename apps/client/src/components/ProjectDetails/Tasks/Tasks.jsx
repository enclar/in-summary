import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

import AddTask from "./AddTask";
import TaskTable from "./TaskTable";

const Tasks = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const user = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="tasks" className="p-10 w-full border-4 border-lime-900/40 font-serif flex flex-col gap-10 items-center">
            <p className=" text-teal-900 text-xl tracking-widest font-bold italic border-double border-4 border-stone-400 py-2 px-10">tasks to be done</p>
            {
                project?.tasks?.length === 0 ?
                <div className="flex flex-col items-center gap-8">
                    <p className="mt-5 text-stone-600 font-semibold italic tracking-widest">no tasks available</p>
                    {
                        user?.accType === "staff" ?
                        <AddTask /> :
                        <></>
                    }
                </div>
                :
                <div className="flex flex-col gap-10 items-center">
                    <TaskTable />
                    {
                        user?.accType === "staff" ?
                        <AddTask /> :
                        <></>
                    }
                </div>
            }
        </div>
    )
}

export default Tasks;