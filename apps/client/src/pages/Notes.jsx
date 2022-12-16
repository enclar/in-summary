import { useNavigate, Navigate } from "react-router-dom";
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

    if (!user) {
        return <Navigate replace to="/login" />
    } else {
        return (
            <div id="notes" className="px-10 py-20 w-full rounded-md flex flex-col items-center font-serif">
                <p className="w-4/5 p-10 bg-lime-900/40 rounded-t-2xl text-slate-50 text-xl font-bold tracking-widest text-center">{project?.title?.toUpperCase()}: <span className="italic">notes & minutes</span></p>
    
                {
                    user?.accType === "staff" ?
                    <div className="w-4/5 px-10 py-16 border-4 border-t-0 border-lime-900/40">
                        <AddNote />
                    </div>
                    :
                    <></>
                }
    
                <div className="w-4/5 px-10 py-16 border-4 border-t-0 border-lime-900/40 rounded-b-2xl flex flex-col items-center gap-10">
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
                    className="bg-teal-900 hover:bg-teal-800 px-5 py-1 mt-10 rounded-full text-slate-50 italic tracking-wider"
                    onClick={() => navigate(-1)}
                >
                    back
                </button>
            </div>
        )
    }

}

export default Notes;