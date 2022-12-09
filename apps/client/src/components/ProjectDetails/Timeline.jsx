import { useEffect, useState } from "react";
import AddCheckpoint from "./AddCheckpoint";

const Timeline = ({ project }) => {
    // setting up state
    const [checkpoints, setCheckpoints] = useState([]);

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
                checkpoints ?
                <div>
                    no checkpoints available
                </div>
                :
                <div>
                    here are your checkpoints!
                </div>
            }
        </div>
    )
}

export default Timeline;