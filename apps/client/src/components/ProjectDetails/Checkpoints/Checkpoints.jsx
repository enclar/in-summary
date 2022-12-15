import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

import AddCheckpoint from "./AddCheckpoint";
import CheckpointTable from "./CheckpointTable";

const Checkpoints = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));

    // setting up state
    const [project] = useAtom(currProjAtom);

    return (
        <div id="checkpoints" className="p-10 w-full border-x-4 font-serif flex flex-col gap-2 items-center">
            <p className=" text-teal-900 text-xl tracking-widest font-bold italic border-double border-4 py-2 px-10">project checkpoints</p>
            {
                project?.checkpoints?.length === 0 ?
                <AddCheckpoint />
                :
                <div className="flex flex-col gap-10 items-center">
                    <label className="flex flex-col items-center gap-2 text-slate-50 tracking-wider">
                        project checkpoints
                        <CheckpointTable />
                    </label>
                    <AddCheckpoint />
                </div>
            }
        </div>
    )
}

export default Checkpoints;