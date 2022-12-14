import { useRef, useEffect } from "react";
import { atom, useAtom } from "jotai";

export const newInventoryImgAtom = atom("");

const UploadInventory = () => {
    const [newImage, setNewImage] = useAtom(newInventoryImgAtom);

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    
    useEffect(() => {
        cloudinaryRef.current = window?.cloudinary;

        widgetRef.current = cloudinaryRef?.current?.createUploadWidget(
            {
                cloudName: "dzz1tj7yu",
                uploadPreset: "capstone"
            },
            async (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log("uploaded image:", result.info);

                    setNewImage(result?.info?.url);
                }
            }
        );
    }, []);

    return (
        <button
            onClick={() => widgetRef.current.open()}
            className="mt-5 mb-10 bg-slate-200 text-slate-700 italic tracking-wider px-5 py-1 rounded-full"
        >
            upload item image
        </button>
    )
}

export default UploadInventory;