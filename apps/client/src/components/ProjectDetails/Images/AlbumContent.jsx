import { useAtom } from "jotai";
import { currAlbumAtom } from "./Albums";
import { currProjAtom } from "../../Projects/ProjectTableRow";
import UploadWidget from "../../Cloudinary/UploadWidget";

const AlbumContent = () => {
    const [album, setAlbum] = useAtom(currAlbumAtom);

    return (
        <div id="album-content" className="bg-slate-200 p-10 rounded-lg flex flex-col items-center gap-5">
            <p className="text-teal-900 text-xl tracking-wider">{album?.name?.toUpperCase()}</p>
            {
                album?.images?.length === 0 ?
                <p className="italic tracking-wider">no photos yet!</p> :
                <div className="w-4/5 p-5 flex gap-5 overflow-x-scroll">
                    {
                        album?.images?.map((img, index) => {
                            return (
                                <img key={index} src={img.url} className="h-80 w-fit" />
                            )
                        })
                    }
                </div>
            }
            <UploadWidget />
        </div>
    )
}

export default AlbumContent;