import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { currAlbumAtom } from "../components/ProjectDetails/Images/Albums";
import { currNoteAtom } from "../components/ProjectDetails/Notes/NoteSummaries";
import { ToastContainer } from "react-toastify";

import ProjectLogs from "../components/ProjectDetails/ProjectLogs";
import Checkpoints from "../components/ProjectDetails/Checkpoints/Checkpoints";
import Tasks from "../components/ProjectDetails/Tasks/Tasks";
import Vendors from "../components/ProjectDetails/Vendors";
import Notes from "../components/ProjectDetails/Notes/Notes";

const ProjectDetails = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [album, setAlbum] = useAtom(currAlbumAtom);
    const [notes, setNote] = useAtom(currNoteAtom);
    const navigate = useNavigate();

    const goToImages = () => {
        setAlbum({});
        navigate(`/projects/${project.id}/images`);
    };

    const goToNotes = () => {
        setNote({});
        navigate(`/projects/${project.id}/notes`);
    };

    return (
        <div id="project-details" className="mt-10 mb-20 w-4/5 flex flex-col items-center">
            <ProjectLogs project={project} />
            <Checkpoints />
            <Tasks />
            <div className="w-full flex font-serif">
                <p
                    className="w-1/2 py-5 px-10 border-4 border-t-0 text-teal-900 text-xl italic font-bold tracking-wider text-center hover:cursor-pointer hover:bg-orange-50"
                    onClick={goToNotes}
                >notes</p>
                <p
                className="w-1/2 py-5 px-10 border-b-4 border-r-4 text-teal-900 text-xl italic font-bold tracking-wider text-center hover:cursor-pointer hover:bg-orange-50"
                    onClick={goToImages}
                >images</p>
            </div>
            <button
                className="bg-teal-900 text-slate-50 font-serif text-lg px-5 py-1 mt-16 rounded-full hover:bg-teal-800"
                onClick={() => navigate(-1)}
            >back</button>
            <ToastContainer />
        </div>
    )
}

export default ProjectDetails;