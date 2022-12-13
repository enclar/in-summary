import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { currAlbumAtom } from "../components/ProjectDetails/Images/Albums";
import { ToastContainer } from "react-toastify";

import ProjectLogs from "../components/ProjectDetails/ProjectLogs";
import Checkpoints from "../components/ProjectDetails/Checkpoints/Checkpoints";
import Tasks from "../components/ProjectDetails/Tasks/Tasks";
import Vendors from "../components/ProjectDetails/Vendors";
import Notes from "../components/ProjectDetails/Notes/Notes";

const ProjectDetails = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [album, setAlbum] = useAtom(currAlbumAtom);
    const navigate = useNavigate();

    const goToImages = () => {
        setAlbum({});
        navigate(`/projects/${project.id}/images`)
    }

    return (
        <div id="project-details" className="my-20 w-4/5 rounded-2xl flex flex-col gap-6 items-center">
            <ProjectLogs project={project} />
            <Checkpoints />
            <Tasks />
            <div className="flex gap-10">
                <p
                    className="bg-sky-900 py-5 px-10 rounded-lg text-slate-50 text-ls tracking-wider hover:cursor-pointer hover:bg-slate-500"
                    onClick={() => navigate(`/projects/${project.id}/notes`)}
                >notes</p>
                <p
                    className="bg-sky-900 py-5 px-10 rounded-lg text-slate-50 text-ls tracking-wider hover:cursor-pointer hover:bg-slate-500"
                    onClick={goToImages}
                >images</p>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProjectDetails;