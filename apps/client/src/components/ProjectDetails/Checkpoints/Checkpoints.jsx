import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

import AddCheckpoint from "./AddCheckpoint";
import CheckpointTable from "./CheckpointTable";

const Checkpoints = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));

    // setting up state
    const [project] = useAtom(currProjAtom);

    return (
        <div id="checkpoints" className="p-10 w-full border-x-4 border-lime-900/40 font-serif flex flex-col gap-10 items-center">
            <p className=" text-teal-900 text-xl tracking-widest font-bold italic border-double border-4 border-stone-400 py-2 px-10">project checkpoints</p>
            {
                project?.checkpoints?.length === 0 ?
                <div className="flex flex-col items-center gap-10">
                    <p className="text-stone-600 font-semibold italic tracking-widest">no checkpoints available</p>
                    <AddCheckpoint />
                </div>
                
                :
                <div className="flex flex-col gap-10 items-center">
                    <CheckpointTable />
                    <AddCheckpoint />
                </div>
            }
        </div>
    )
}

export default Checkpoints;