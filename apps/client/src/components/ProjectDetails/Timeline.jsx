import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

import AddCheckpoint from "./AddCheckpoint";
import CheckpointTable from "./CheckpointTable";

export const checkpointAtom = atom([]);

const Timeline = ({ project }) => {
    // setting up state
    const [checkpoints, setCheckpoints] = useAtom(checkpointAtom);

    // fetching all checkpoints
    useEffect(() => {
        const getCheckpoints = async () => {
            const url = "/api/checkpoints/" + project.id;

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
                    console.log("fetched all checkpoints:", data);
                    setCheckpoints(data);
                } else {
                    console.log("no checkpoints available for this project");
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

        getCheckpoints();
    }, []);

    return (
        <div id="timeline" className="mt-10 flex flex-col items-center">
            {
                checkpoints.length === 0 ?
                <div className="bg-sky-900 p-4 rounded-lg">
                    <AddCheckpoint project={project} />
                </div>
                :
                <div className="bg-sky-900 p-4 rounded-lg flex flex-col gap-8 items-center">
                    <label className="flex flex-col items-center gap-2 text-slate-50 tracking-wider">
                        project checkpoints
                        <CheckpointTable />
                    </label>
                    <AddCheckpoint project={project} />
                </div>
            }
        </div>
    )
}

export default Timeline;