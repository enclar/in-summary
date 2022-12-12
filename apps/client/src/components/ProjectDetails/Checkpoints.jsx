import { useAtom } from "jotai";
import { currProjAtom } from "../Projects/ProjectTableRow";

import AddCheckpoint from "./AddCheckpoint";
import CheckpointTable from "./CheckpointTable";

const Checkpoints = () => {
    // setting up state
    const [project] = useAtom(currProjAtom);

    return (
        <div id="timeline" className="flex flex-col items-center">
            {
                project?.checkpoints?.length === 0 ?
                <div className="bg-sky-900 p-4 rounded-lg">
                    <AddCheckpoint />
                </div>
                :
                <div className="bg-sky-900 p-4 rounded-lg flex flex-col gap-8 items-center">
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