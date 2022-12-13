import { useAtom, atom } from "jotai";
import { currProjAtom } from "../../Projects/ProjectTableRow";

export const currAlbumAtom = atom({});

const Albums = () => {
    const [project, setProject] = useAtom(currProjAtom);
    const [album, setAlbum] = useAtom(currAlbumAtom);

    return (
        <div className="flex flex-col items-center gap-3">
            <p>project albums</p>
            <div className="flex gap-5">
                {
                    project?.albums?.map((album, index) => {
                        return (
                            <p
                                key={index}
                                className="bg-teal-800 px-8 py-2 rounded-lg text-slate-50"
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