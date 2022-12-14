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
        <div id="images" className=" mt-10 mb-20 w-3/4 flex flex-col items-center font-serif">
            <p className="w-full py-5 px-10 border-8 border-double text-teal-900 text-xl font-bold tracking-widest text-center">{project?.title?.toUpperCase()}: <span className="italic">project images & graphics</span></p>
            {
                project?.albums?.length === 0 ?
                <div className="p-10 border-4 border-t-0 w-full flex flex-col items-center gap-10">
                    <AddAlbum />
                    <p className="text-teal-900 italic tracking-wider">no albums available</p>
                </div>
                :
                <div className="flex flex-col w-full items-center">
                    <div className="p-10 border-4 border-t-0 w-full flex flex-col items-center gap-10">
                        <AddAlbum />
                        <Albums />
                    </div>

                    {
                        Object.keys(album).length === 0 ?
                        <></> :
                        <AlbumContent />
                    }
                </div>
            }
            <button 
                className="bg-teal-900 px-5 py-1 mt-10 rounded-full text-slate-50 italic tracking-wider"
                onClick={() => navigate(-1)}
            >
                back
            </button>
        </div>
    )
}

export default Images;