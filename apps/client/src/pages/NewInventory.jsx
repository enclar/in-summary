import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NewInventoryForm from "../components/Inventory/NewInventoryForm";

const NewInventory = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("currUser"));

    if (!user) {
        return <Navigate replace to="/login" />
    } else if (user?.accType !== "staff") {
        return <Navigate replace to="/unauthorized" />
    } else {
        return (
            <div id="new-inventory" className="px-10 py-20 min-h-screen w-full font-serif flex flex-col items-center">
                <p className="w-1/3 py-5 px-10 rounded-t-xl text-center text-lg text-stone-50 tracking-wide italic font-bold bg-lime-900/40">add a new inventory item</p>
    
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
}

export default NewInventory;