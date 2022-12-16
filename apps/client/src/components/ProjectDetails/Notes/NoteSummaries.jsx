import { useNavigate } from "react-router-dom";
import { atom, useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

export const currNoteAtom = atom({});

const NoteSummaries = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [currNote, setCurrNote] = useAtom(currNoteAtom);

    const navigate = useNavigate();

    // function to display full content of note
    const displayNote = (note) => {
        setCurrNote(note);
    }

    return (
        <div id="note-summaries" className="w-4/5 flex flex-col items-center gap-5">
            <p className="text-teal-900 text-lg italic font-semibold tracking-wider">project notes</p>
            <div className="w-full p-2 flex gap-5 items-center justify-center">
                {
                    project?.notes?.map((note, index) => {
                        return (
                            <div
                                key={index}
                                className="border-double border-4 border-stone-400 px-5 py-2 h-fit flex flex-col items-center hover:bg-orange-50 hover:cursor-pointer"
                                onClick={() => displayNote(note)}
                            >
                                <p className="text-teal-900 tracking-wider">{note?.date?.slice(0, 10)}</p>
                                <pre className="font-serif text-slate-700 tracking-wider">
                                    <p>{note?.content?.slice(0, 25)}...</p>
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