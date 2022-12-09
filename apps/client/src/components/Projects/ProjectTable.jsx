import ProjectTableRow from "./ProjectTableRow";
import { projectAtom } from "../../pages/Projects";
import { useAtom } from "jotai";

const ProjectTable = () => {
    // setting up projects with jotai
    const [ projects ] = useAtom(projectAtom);

    // mapping out table rows
    const rows = projects?.map((project, index) => {
        return(
            <ProjectTableRow key={index} project={project} index={parseInt(index)} />
        )
    });

    return (
        <table>
            <thead>
                <tr>
                    <th className="bg-slate-300 px-5">type</th>
                    <th className="bg-slate-400 px-5">project</th>
                    <th className="bg-slate-300 px-5">date</th>
                    <th className="bg-slate-400 px-5">location</th>
                    <th className="bg-slate-300 px-5">client</th>
                    <th className="bg-slate-400 px-5">in-charge</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default ProjectTable;