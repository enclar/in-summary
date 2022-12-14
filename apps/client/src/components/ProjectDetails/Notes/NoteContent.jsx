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

    // function to delete a note
    const deleteNote = async () => {
        const url = "/api/notes/delete/" + currNote.id;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log("deleted note:", data);
                const filtered = project?.notes?.filter(note => note?.id !== data?.id);
                setProject({...project, notes: filtered});
                setCurrNote({});
            } else {
                console.log("server error:", error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <div id="note-content" className="w-3/5 flex flex-col items-center" >
            <p className="text-teal-900 italic font-semibold px-10 py-5 border-double border-4 w-full text-center text-xl tracking-wider">
                {currNote?.date?.slice(0, 10)} meeting notes
            </p>
            {
                !editing ?
                <div className="border-4 border-t-0 w-full px-20 py-10 flex flex-col items-center justify-center gap-10">
                    <pre className="font-serif whitespace-pre-wrap">
                        <p>{currNote?.content}</p>
                    </pre>
                    
                    <div className="flex gap-5 justify-center items-center">
                        <ion-icon name="create-outline" size="large" style={{ color: "darkGrey"}} onClick={() => setEditing(!editing)}></ion-icon>
                        <ion-icon name="close" size="large" style={{ color: "darkGrey", cursor: "pointer"}} onClick={deleteNote}></ion-icon>
                    </div>
                </div>
                :
                <div className="border-4 border-t-0 w-full px-20 py-10 flex flex-col items-center justify-center gap-5">
                    <pre className="font-serif w-full flex flex-col items-center">
                        <textarea id="edited-content" className="bg-orange-50 w-4/5 h-80 p-2 text-lg tracking-wider text-slate-700" defaultValue={currNote?.content} />
                    </pre>
                    <button
                        className="bg-teal-900 text-slate-50 mt-5 px-5 py-1 rounded-full italic tracking-wider text-lg"
                        onClick={editNote}
                    >
                        save edits
                    </button>
                </div>
            }
        </div>
    )
}

export default NoteContent;