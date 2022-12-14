import { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { currProjAtom } from "../Projects/ProjectTableRow";

const UploadInventory = () => {
    const [project, setProject] = useAtom(currProjAtom);

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;

        widgetRef.current = cloudinaryRef.current.createUploadInventory(
            {
                cloudName: "dzz1tj7yu",
                uploadPreset: "capstone"
            },
            async (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("uploaded image:", result.info);
                }
            }
        );
    }, []);

    return (
        <button
            onClick={() => widgetRef.current.open()}
            className="mt-5 bg-teal-900 text-slate-50 px-5 py-1 rounded-full"
        >
            upload image
        </button>
    )
}

export default UploadInventory;