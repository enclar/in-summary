import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { currNoteAtom } from "../components/ProjectDetails/Notes/NoteSummaries";
import AddNote from "../components/ProjectDetails/Notes/AddNote";
import NoteSummaries from "../components/ProjectDetails/Notes/NoteSummaries";
import NoteContent from "../components/ProjectDetails/Notes/NoteContent";

const Notes = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [note, setNote] = useAtom(currNoteAtom);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="notes" className="mt-10 mb-20 p-10 w-4/5 rounded-md flex flex-col items-center font-serif">
            <p className="w-full py-5 px-10 border-8 border-double text-teal-900 text-xl font-bold tracking-widest text-center">{project?.title?.toUpperCase()}: <span className="italic">notes & minutes</span></p>

            {
                user?.accType === "staff" ?
                <div className="w-full p-10 border-4 border-t-0">
                    <AddNote />
                </div>
                :
                <></>
            }

            <div className="w-full p-10 border-4 border-t-0 flex flex-col items-center gap-10">
                {
                    project?.notes?.length === 0 ?
                    <p className="text-stone-600 font-semibold text-md italic tracking-widest">no notes available</p> :
                    <NoteSummaries />
                }
                {
                    Object.keys(note).length === 0 ?
                    <></> :
                    <NoteContent />
                }
            </div>

            <button 
                className="bg-teal-900 px-5 py-1 mt-10 rounded-full text-slate-50 italic tracking-wider"
                onClick={() => navigate(-1)}
            >
                back
            </button>
        </div>
    )
}

export default Notes;