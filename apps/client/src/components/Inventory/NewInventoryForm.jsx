import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { newInventoryImgAtom } from "../Cloudinary/UploadInventory";
import UploadInventory from "../Cloudinary/UploadInventory";

const NewInventoryForm = () => {
    const { register, handleSubmit } = useForm();
    const [newImage, setNewImage] = useAtom(newInventoryImgAtom);

    // function to add a new inventory item
    const addInventory = async (data) => {
        data.quantity = parseInt(data.quantity);
        data.imageUrl = newImage;
        console.log("data:", data);

        if (!newImage) {
            toast.error("Please upload an image of the inventory item");
            return
        }

        try {
            const response = await fetch("/api/inventory/new", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(data)
            });

            const data2 = await response.json();

            if (response.ok) {
                toast.success(`${data2.name} has been added to your inventory!`);
                document.getElementById("new-inventory-form").reset();
                setNewImage("");
            } else {
                console.log("server error:", data2.error);
                toast.error("Unable to add new item, please try again");
            }
        } catch (error) {
            console.log("client error:", )
        }
    };

    return (
        <form
            id="new-inventory-form"
            className="flex flex-col items-center gap-5 w-1/3 py-10 px-5 border-4 border-t-0 border-lime-900/40 rounded-b-xl"
            autoComplete="off"
            onSubmit={handleSubmit(addInventory)}
        >
            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                name
                <input {...register("name")} className="bg-orange-100 px-1" required />
            </label>

            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                description
                <textarea {...register("description")} className="bg-orange-100 px-1 h-28" />
            </label>
        
            <label className="w-3/5 flex flex-col text-slate-700 tracking-wider">
                quantity
                <input type="number" {...register("quantity")} className="bg-orange-100 px-1" required />
            </label>

            {
                !newImage ?
                <UploadInventory /> :
                <div className="flex flex-col items-center my-5">
                    <img src={newImage} className="w-60 h-fit" />
                    <button
                        className="mt-5 bg-slate-200 text-slate-700 italic tracking-wider px-5 py-1 rounded-full"
                        onClick={() => setNewImage("")}
                    >
                        remove image
                    </button>
                </div>
            }
            

            <button className="bg-teal-900 hover:bg-teal-800 text-slate-50 italic tracking-wider px-5 py-1 rounded-full">add new item</button>
        </form>
    )
}

export default NewInventoryForm;