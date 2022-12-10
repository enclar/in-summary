import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";

import Timeline from "../components/ProjectDetails/Timeline";
import ProjectLogs from "../components/ProjectDetails/ProjectLogs";
import Tasks from "../components/ProjectDetails/Tasks";

const ProjectDetails = () => {
    const [projDetails, setProjDetails] = useAtom(currProjAtom);

    return (
        <div id="project-details" className="p-20 flex flex-col gap-6 items-center">
            <ProjectLogs project={projDetails} />
            <Timeline project={projDetails} />
            <Tasks project={projDetails} />
        </div>
    )
}

export default ProjectDetails;