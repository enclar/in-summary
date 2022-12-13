import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    return (
        <div id="project-details" className="my-20 w-4/5 rounded-2xl flex flex-col gap-6 items-center">
            <ProjectLogs project={projDetails} />
            <Checkpoints />
            <Tasks />
            <Notes />
            <Vendors project={projDetails} />
            <button onClick={() => navigate(`/projects/${projDetails.id}/images`)}>images</button>
            <ToastContainer />
        </div>
    )
}

export default ProjectDetails;