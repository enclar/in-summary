import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NewInventoryForm from "../components/Inventory/NewInventoryForm";

const NewInventory = () => {
    const navigate = useNavigate();
    
    return (
        <div id="new-inventory" className="mt-10 mb-20 w-1/3 font-serif flex flex-col items-center">
            <p className="w-full py-4 px-10 text-center text-lg text-teal-900 tracking-wide italic font-bold border-double border-4">add a new inventory item</p>

            <NewInventoryForm />

            <p
                className="mt-10 text-teal-900 tracking-widest italic font-semibold hover:underline hover:cursor-pointer"
                onClick={() => navigate("/inventory")}
            >
                view all inventory items
            </p>
            <ToastContainer />
        </div>
    )
}

export default NewInventory;