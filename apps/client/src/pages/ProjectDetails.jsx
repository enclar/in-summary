import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { ToastContainer } from "react-toastify";

import ProjectLogs from "../components/ProjectDetails/ProjectLogs";
import Checkpoints from "../components/ProjectDetails/Checkpoints/Checkpoints";
import Tasks from "../components/ProjectDetails/Tasks/Tasks";
import Vendors from "../components/ProjectDetails/Vendors";
import Notes from "../components/ProjectDetails/Notes/Notes";

const ProjectDetails = () => {
    const [projDetails, setProjDetails] = useAtom(currProjAtom);

    return (
        <div id="project-details" className="my-20 w-4/5 rounded-2xl flex flex-col gap-6 items-center">
            <ProjectLogs project={projDetails} />
            <Checkpoints />
            <Tasks />
            <Notes />
            <Vendors project={projDetails} />
            <ToastContainer />
        </div>
    )
}

export default ProjectDetails;