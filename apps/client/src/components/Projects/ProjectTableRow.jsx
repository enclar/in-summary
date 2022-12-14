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
            className="border-b-2 hover:cursor-pointer hover:bg-orange-50 font-serif tracking-wider text-slate-600"
            onClick={viewDetails}
        >
            <td className="px-10 py-2 text-center border-r-2">{project?.type}</td>
            <td className="px-10 py-2 text-center border-r-2">{project?.title}</td>
            { 
                project?.startDate === project?.endDate ? 
                <td className="px-10 py-2 text-center border-r-2">{project?.startDate?.slice(0, 10)}</td> : 
                <td className="px-10 py-2 text-center border-r-2">{project?.startDate?.slice(0,10)} to {project?.endDate?.slice(0,10)}</td>
            }
            <td className="px-10 py-2 text-center border-r-2">{project?.location}</td>
            <td className="px-10 py-2 text-center border-r-2">{project?.client?.name}</td>
            <td className="px-10 py-2 text-center">{project?.inCharge?.name}</td>
        </tr>
    )
}

export default ProjectTableRow;