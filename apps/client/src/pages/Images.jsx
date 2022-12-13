import { useAtom } from "jotai";
import { currProjAtom } from "../components/Projects/ProjectTableRow";
import { currAlbumAtom } from "../components/ProjectDetails/Images/Albums";
import AddAlbum from "../components/ProjectDetails/Images/AddAlbum";
import Albums from "../components/ProjectDetails/Images/Albums";
import AlbumContent from "../components/ProjectDetails/Images/AlbumContent";


const Images = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [album, setAlbum] = useAtom(currAlbumAtom);

    return (
        <div id="images" className="my-20 flex flex-col items-center">
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
        </div>
    )
}

export default Images;