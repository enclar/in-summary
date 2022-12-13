import { useAtom } from "jotai";
import { currAlbumAtom } from "./Albums";
import { currProjAtom } from "../../Projects/ProjectTableRow";
import UploadWidget from "../../Cloudinary/UploadWidget";

const AlbumContent = () => {
    const [album, setAlbum] = useAtom(currAlbumAtom);

    return (
        <div id="album-content" className="bg-slate-200 p-10 rounded-lg flex flex-col items-center">
            <p className="text-teal-900 text-lg tracking-wider">{album?.name}</p>
            {
                album?.images?.length === 0 ?
                <p className="italic tracking-wider">no photos yet!</p> :
                <div className="flex gap-5">
                    {
                        album?.images?.map((img, index) => {
                            return (
                                <img key={index} src={img.thumbnailUrl} />
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