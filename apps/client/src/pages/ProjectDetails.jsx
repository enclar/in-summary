import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import Timeline from "../components/ProjectDetails/Timeline";

const ProjectDetails = () => {
    const [projDetails, setProjDetails] = useAtom(currProjAtom);

    return (
        <div id="project-details" className="mt-20 flex flex-col items-center">
            <p className="bg-teal-900 py-2 px-10 rounded-full text-slate-50 tracking-wider text-2xl">{projDetails?.title?.toUpperCase()}</p>
            <Timeline project={projDetails} />
        </div>
    )
}

export default ProjectDetails;