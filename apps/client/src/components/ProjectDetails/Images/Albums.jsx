import { useAtom, atom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

export const currAlbumAtom = atom({});

const Albums = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [album, setAlbum] = useAtom(currAlbumAtom);

    return (
        <div className="flex flex-col items-center gap-3">
            <p className="tracking-widest text-teal-900 text-lg italic font-semibold">available albums</p>
            <div className="flex gap-5">
                {
                    project?.albums?.map((album, index) => {
                        return (
                            <p
                                key={index}
                                className="border-double border-4 border-width px-8 py-2 text-teal-900 tracking-wider hover:bg-orange-50 hover:cursor-pointer"
                                onClick={() => setAlbum(album)}
                            >
                                {album?.name}
                            </p>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Albums;