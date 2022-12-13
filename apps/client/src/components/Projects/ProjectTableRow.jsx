import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const currProjAtom = atom({});

const ProjectTableRow = ({ project }) => {
    // setting up state in jotai
    const [currProj, setCurrProj] = useAtom(currProjAtom);

    // setting up navigation
    const navigate = useNavigate();

    // function to view specific project details
    const viewDetails = () => {
        setCurrProj(project);
        navigate(`/projects/${project.id}`)
    }

    return (
        <tr
            className="bg-violet-50 border-slate-50 border-b-2 hover:cursor-pointer hover:bg-sky-200"
            onClick={viewDetails}
        >
            <td className="px-5 py-1 text-center">{project?.type}</td>
            <td className="px-5 py-1 text-center">{project?.title}</td>
            { 
                project?.startDate === project?.endDate ? 
                <td className="px-5 py-1 text-center">{project?.startDate?.slice(0, 10)}</td> : 
                <td className="px-5 py-1 text-center">{project?.startDate?.slice(0,10)} to {project?.endDate?.slice(0,10)}</td>
            }
            <td className="px-5 py-1 text-center">{project?.location}</td>
            <td className="px-5 py-1 text-center">{project?.client?.name}</td>
            <td className="px-5 py-1 text-center">{project?.inCharge?.name}</td>
        </tr>
    )
}

export default ProjectTableRow;