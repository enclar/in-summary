import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const currProjAtom = atom({});

const ProjectTableRow = ({project, index}) => {
    // setting up state in jotai
    const [currProj, setCurrProj] = useAtom(currProjAtom);

    // setting up navigation
    const navigate = useNavigate();

    // function to view specific project details
    const viewDetails = () => {
        setCurrProj(project);
        NavigationPreloadManager(`/projects/${project.id}`)
    }

    return (
        <tr
            className={ index%2 === 0 ? "bg-violet-50 hover:cursor-pointer" : "bg-orange-100 hover:cursor-pointer" }
        >
            <td className="px-5 py-1 text-center border-slate-500 border-r-2">{project?.type}</td>
            <td className="px-5 py-1 text-center border-slate-500 border-r-2">{project?.title}</td>
            { 
                project?.startDate === project?.endDate ? 
                <td className="px-5 py-1 text-center border-slate-500 border-r-2">{project?.startDate?.slice(0, 10)}</td> : 
                <td className="px-5 py-1 text-center border-slate-500 border-r-2">{project?.startDate?.slice(0,10)} to {project?.endDate?.slice(0,10)}</td>
            }
            <td className="px-5 py-1 text-center border-slate-500 border-r-2">{project?.location}</td>
            <td className="px-5 py-1 text-center border-slate-500 border-r-2">{project?.client?.name}</td>
            <td className="px-5 py-1 text-center">{project?.inCharge?.name}</td>
        </tr>
    )
}

export default ProjectTableRow;