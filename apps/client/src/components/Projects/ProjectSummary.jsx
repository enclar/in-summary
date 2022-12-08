const ProjectSummary = ({ project }) => {
    return (
        <div id="proj-summary" className="bg-teal-900 px-5 py-4 rounded-md">
            <div className="pt-2 pb-3 px-2 border-b-2 text-slate-50 flex items-end gap-16">
                <div className="flex flex-col">
                    <p>#{project.type}</p>
                    <p className="mt-1 text-lg">{project.title}</p>
                </div>
                <div className="flex flex-col items-end">
                    <p>{project?.date?.slice(0, 10)}</p>
                    <p className="text-end">{project?.location}</p>
                    <p>I/C: {project?.inCharge?.name}</p>
                </div>
            </div>
        </div>
    )
}

export default ProjectSummary;