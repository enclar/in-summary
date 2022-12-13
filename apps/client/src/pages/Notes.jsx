import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { currNoteAtom } from "../components/ProjectDetails/Notes/NoteSummaries";
import AddNote from "../components/ProjectDetails/Notes/AddNote";
import NoteSummaries from "../components/ProjectDetails/Notes/NoteSummaries";
import NoteContent from "../components/ProjectDetails/Notes/NoteContent";

const Notes = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [note, setNote] = useAtom(currNoteAtom);

    return (
        <div id="notes" className="my-20 bg-sky-900 p-10 w-4/5 rounded-md flex flex-col items-center gap-10">
            <AddNote />
            {
                project?.notes?.length === 0 ?
                <p>no notes yet!</p> :
                <NoteSummaries />
            }
            {
                Object.keys(note).length === 0 ?
                <></> :
                <NoteContent />
            }
        </div>
    )
}

export default Notes;