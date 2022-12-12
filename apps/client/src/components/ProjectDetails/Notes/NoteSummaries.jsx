import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

const NoteSummaries = () => {
    const [project, setProject] = useAtom(currProjAtom);

    return (
        <div id="note-summaries" className="w-4/5 flex flex-col items-center">
            <p className="text-slate-50 tracking-wider">project notes</p>
            <div className="w-full p-2 flex gap-5 items-center justify-center">
                {
                    project?.notes?.map((note, index) => {
                        return (
                            <div key={index} className="bg-slate-50 px-5 py-1 h-20 rounded-md flex flex-col items-center hover:bg-sky-200 hover:cursor-pointer">
                                <p>{note?.date?.slice(0, 10)}</p>
                                <pre className="font-sans">
                                    <p>{note?.content?.slice(0, 50)}...</p>
                                </pre>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default NoteSummaries;