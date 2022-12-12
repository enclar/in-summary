import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

import AddCheckpoint from "./AddCheckpoint";
import CheckpointTable from "./CheckpointTable";

const Checkpoints = () => {
    // setting up state
    const [project] = useAtom(currProjAtom);

    return (
        <div id="checkpoints" className="bg-sky-900 p-4 rounded-lg w-4/5 flex flex-col items-center">
            {
                project?.checkpoints?.length === 0 ?
                <AddCheckpoint />
                :
                <div className="flex flex-col gap-8 items-center">
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