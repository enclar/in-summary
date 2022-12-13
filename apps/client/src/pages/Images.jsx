import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { currAlbumAtom } from "../components/ProjectDetails/Images/Albums";
import AddAlbum from "../components/ProjectDetails/Images/AddAlbum";
import Albums from "../components/ProjectDetails/Images/Albums";
import AlbumContent from "../components/ProjectDetails/Images/AlbumContent";


const Images = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [album, setAlbum] = useAtom(currAlbumAtom);

    const navigate = useNavigate();

    return (
        <div id="images" className="my-20 flex flex-col items-center gap-10">
            {
                project?.albums?.length === 0 ?
                <div className="flex flex-col gap-8 items-center">
                    <AddAlbum />
                    <p>no albums available</p>
                </div>
                :
                <div className="flex flex-col gap-8 items-center">
                    <AddAlbum />
                    <Albums />
                    {
                        Object.keys(album).length === 0 ?
                        <></> :
                        <AlbumContent />
                    }
                </div>
            }
            <button 
                className="bg-sky-900 px-5 py-1 rounded-full text-slate-50 tracking-wider"
                onClick={() => navigate(-1)}
            >
                back
            </button>
        </div>
    )
}

export default Images;