import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { ToastContainer } from "react-toastify";

import Timeline from "../components/ProjectDetails/Timeline";
import ProjectLogs from "../components/ProjectDetails/ProjectLogs";
import Tasks from "../components/ProjectDetails/Tasks";
import Vendors from "../components/ProjectDetails/Vendors";

const ProjectDetails = () => {
    const [projDetails, setProjDetails] = useAtom(currProjAtom);

    return (
        <div id="project-details" className="p-20 flex flex-col gap-6 items-center">
            <ProjectLogs project={projDetails} />
            <Timeline project={projDetails} />
            <Tasks project={projDetails} />
            <Vendors project={projDetails} />
            <ToastContainer />
        </div>
    )
}

export default ProjectDetails;