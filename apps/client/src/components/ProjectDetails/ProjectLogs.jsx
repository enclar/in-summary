const ProjectLogs = ({ project }) => {
    return (
        <div id="project-logs" className="bg-teal-800 px-10 py-4 rounded-md flex flex-col gap-5 items-center">
            <p className="text-slate-50 text-2xl tracking-widest">{project?.title?.toUpperCase()}</p>
            <div className="flex gap-5">
                <p className="bg-slate-50 px-3 rounded-sm text-teal-800"># {project?.type}</p>
                <p className="bg-slate-50 px-3 rounded-sm text-teal-800">{project?.location}</p>
                { 
                    project?.startDate === project?.endDate ? 
                    <p className="bg-slate-50 px-3 rounded-sm text-teal-800">{project?.startDate?.slice(0, 10)}</p> : 
                    <p className="bg-slate-50 px-3 rounded-sm text-teal-800">{project?.startDate?.slice(0,10)} to {project?.endDate?.slice(0,10)}</p>
                }
                <p className="bg-slate-50 px-3 rounded-sm text-teal-800">i/c - {project?.inCharge?.name}</p>
            </div>
        </div>
    )
}

export default ProjectLogs;