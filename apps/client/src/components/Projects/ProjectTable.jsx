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
                <tr className="border-y-4 border-double text-teal-900 italic tracking-widest font-serif">
                    <th className="px-10 py-2 border-r-2">type</th>
                    <th className="px-10 py-2 border-r-2">project</th>
                    <th className="px-10 py-2 border-r-2">date</th>
                    <th className="px-10 py-2 border-r-2">location</th>
                    <th className="px-10 py-2 border-r-2">client</th>
                    <th className="px-10 py-2">in-charge</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default ProjectTable;