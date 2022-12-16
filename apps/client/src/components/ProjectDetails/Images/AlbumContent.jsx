import { useState } from "react";
import { useAtom } from "jotai";
import { currAlbumAtom } from "./Albums";
import { currProjAtom } from "../../Projects/ProjectTableRow";
import UploadWidget from "../../Cloudinary/UploadWidget";

const AlbumContent = () => {
    const [album, setAlbum] = useAtom(currAlbumAtom);
    const [project, setProject] = useAtom(currProjAtom);
    const [editing, setEditing] = useState(false);

    // remove an image from the server
    const removeImage = async (id) => {
        const url = "/api/albums/delete-img/" + id
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
                console.log("deleted image:", data);
                const filtered = album?.images?.filter(image => image.id !== data.id);
                const updatedAlbum = {...album, images: filtered};
                setAlbum(updatedAlbum);
                const filteredAlbums = project?.albums?.filter(album => album.id !== data?.albumId);
                filteredAlbums?.unshift(updatedAlbum);
                setProject({...project, albums: filteredAlbums });
            } else {
                console.log("server error:", data.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    }

    // update an album name
    const editName = async () => {
        const url = "/api/albums/edit-name/" + album.id;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify({ name: document.getElementById("album-name").value })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("updated album:", data);
                setAlbum(data);
                setProject(data?.project);
                setEditing(false);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    // delete an album and its images
    const deleteAlbum = async () => {
        const url = "/api/albums/delete-album/" + album.id;
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
                console.log("deleted album:", data);
                const filtered = project?.albums?.filter(album => album?.id !== data?.id);
                setProject({...project, albums: filtered});
                setAlbum({});
            } else {
                console.log("server error:", data?.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <div id="album-content" className="w-full p-10 border-4 border-lime-900/40 rounded-b-2xl border-t-0 flex flex-col items-center justify-center gap-5">
            {
                !editing ?
                <div className="flex flex-col gap-2 justify-center items-center">
                    <div>
                        <ion-icon name="create-outline" size="large" style={{ color: "darkGrey", cursor: "pointer"}} onClick={() => setEditing(true)}></ion-icon>
                        <ion-icon name="close" size="large" style={{ color: "darkGrey", cursor: "pointer"}} onClick={deleteAlbum}></ion-icon>
                    </div>
                    <p className="text-teal-900 text-xl tracking-wider">{album?.name?.toUpperCase()}</p>
                </div>
                :
                <div className="flex gap-5">
                    <label className="flex gap-2 justify-center items-center tracking-wider text-teal-900">
                        album name:
                        <input id="album-name" defaultValue={album?.name} className="bg-orange-100 text-slate-700 p-1" />
                    </label>
                    <button className="bg-teal-900 text-slate-50 px-4 py-1 rounded-full italic tracking-wider" onClick={editName}>save</button>
                </div>
            }
            
            <UploadWidget />
            
            {
                album?.images?.length === 0 ?
                <p className="italic tracking-wider">no photos yet!</p> :
                <div className="w-4/5 flex flex-wrap gap-5 items-center justify-center">
                    {
                        album?.images?.map((img, index) => {
                            return (
                                <div key={index} className="relative">
                                    <img key={index} src={img.url} className="h-80 w-fit" />
                                    <ion-icon
                                        name="close"
                                        size="large"
                                        style={{ color: "red", position: "absolute", right: "10px", top: "10px", cursor: "pointer" }}
                                        onClick={() => removeImage(img?.id)}
                                    ></ion-icon>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default AlbumContent;