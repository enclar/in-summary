import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";

import AddNote from "../components/ProjectDetails/Notes/AddNote";
import NoteSummaries from "../components/ProjectDetails/Notes/NoteSummaries";

const Notes = () => {
    const [project, setProject] = useAtom(currProjAtom);

    return (
        <div id="notes" className="bg-sky-900 w-4/5 p-4 rounded-lg flex flex-col items-center gap-5">
            {
                project?.notes?.length === 0 ?
                <AddNote />
                :
                <>
                    <NoteSummaries />
                    <AddNote />
                </>
            }
        </div>
    )
}

export default Notes;