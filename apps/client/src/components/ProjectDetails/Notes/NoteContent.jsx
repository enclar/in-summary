import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";
import { currNoteAtom } from "./NoteSummaries";

const NoteContent = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [currNote, setCurrNote] = useAtom(currNoteAtom);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();

    // function to update note content
    const editNote = async () => {
        const editedContent = document.getElementById("edited-content").value;
        const url = "/api/notes/edit/" + currNote.id;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify({ content: editedContent })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("updated the note:", data);
                setCurrNote(data);
                const filteredNotes = project?.notes?.filter(note => note.id !== data.id);
                setProject({...project, notes: [data, ...filteredNotes]});
                setEditing(!editing);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <div id="note-content" className="w-full flex flex-col items-center gap-10" >
            <div className="bg-sky-900 p-10 w-3/5 rounded-lg flex flex-col items-center gap-10 text-slate-50">
                <p className="bg-slate-50 text-sky-900 px-5 py-1 rounded-full text-xl tracking-wider">
                    {currNote?.date?.slice(0, 10)} MEETING NOTES
                </p>
                {
                    !editing ?
                    <>
                        <pre className="font-sans w-full">
                            <p className="text-lg w-4/6">{currNote?.content}</p>
                        </pre>
                        <button
                            className="bg-slate-50 text-sky-900 mt-5 px-5 py-1 rounded-full tracking-wider text-lg"
                            onClick={() => setEditing(!editing)}
                        >
                            edit note
                        </button>
                    </>
                    :
                    <>
                        <pre className="font-sans w-full flex flex-col items-center">
                            <textarea id="edited-content" className="w-4/5 h-80 p-2 text-lg text-slate-900" defaultValue={currNote?.content} />
                        </pre>
                        <button
                            className="bg-slate-50 text-sky-900 mt-5 px-5 py-1 rounded-full tracking-wider text-lg"
                            onClick={editNote}
                        >
                            save edits
                        </button>
                    </>
                }
            </div>
            <button 
                className="bg-sky-900 px-5 py-1 rounded-full text-slate-50 tracking-wider text-lg"
                onClick={() => navigate(-1)}
            >
                back
            </button>
        </div>
    )
}

export default NoteContent;