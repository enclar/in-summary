import { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { currAlbumAtom } from "../ProjectDetails/Images/Albums";
import { currProjAtom } from "../Projects/ProjectTableRow";

const UploadWidget = () => {
    const [album, setAlbum] = useAtom(currAlbumAtom);
    const [project, setProject] = useAtom(currProjAtom);

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;

        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dzz1tj7yu",
                uploadPreset: "capstone"
            },
            async (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("uploaded image:", result.info);

                    try {
                        const response = await fetch("/api/albums/new-img", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                token: JSON.parse(localStorage.getItem("token"))
                            },
                            body: JSON.stringify({
                                url: result?.info?.url,
                                thumbnailUrl: result?.info?.thumbnail_url,
                                albumId: album.id
                            })
                        });

                        const data = await response.json();

                        if (response.ok) {
                            console.log("added photo:", data?.album);
                            setAlbum(data?.album);
                            const filtered = project?.albums?.filter(album => album.id !== data?.album?.id);
                            filtered.push(data?.album);
                            setProject({...project, albums: filtered})
                        } else {
                            console.log("server error:", data.error);
                        }
                    } catch (error) {
                        console.log("widget error:", error);
                    }
                }
            }
        );
    }, []);

    return (
        <button
            onClick={() => widgetRef.current.open()}
            className="mt-20 bg-teal-900 text-slate-50 px-5 py-1 rounded-full"
        >
            upload image
        </button>
    )
}

export default UploadWidget;