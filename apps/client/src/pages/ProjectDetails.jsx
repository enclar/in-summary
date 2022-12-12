import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { ToastContainer } from "react-toastify";

import Checkpoints from "../components/ProjectDetails/Checkpoints";
import ProjectLogs from "../components/ProjectDetails/ProjectLogs";
import Tasks from "../components/ProjectDetails/Tasks";
import Vendors from "../components/ProjectDetails/Vendors";
import Notes from "../components/ProjectDetails/Notes";

const ProjectDetails = () => {
    const [projDetails, setProjDetails] = useAtom(currProjAtom);

    return (
        <div id="project-details" className="p-20 flex flex-col gap-6 items-center">
            <ProjectLogs project={projDetails} />
            <Checkpoints />
            {/* <Tasks project={projDetails} />
            <Notes project={projDetails} /> */}
            <Vendors project={projDetails} />
            <ToastContainer />
        </div>
    )
}

export default ProjectDetails;