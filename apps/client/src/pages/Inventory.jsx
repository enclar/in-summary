import { useEffect } from "react";
import { Link } from "react-router-dom";
import { atom, useAtom } from "jotai";

export const inventoryAtom = atom([]);

const Inventory = () => {
    const [inventory, setInventory] = useAtom(inventoryAtom);

    // fetching all the available inventory
    useEffect(() => {
        const getInventory = async () => {
            try {
                const response = await fetch("/api/inventory/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: JSON.parse(localStorage.getItem("token"))
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched all inventory:", data);
                    setInventory(data);
                } else {
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

    }, []);

    return (
        <div id="inventory" className="my-10 w-screen flex flex-col items-center gap-10">
            <Link
                className="text-teal-900 font-serif tracking-widest italic font-semibold hover:underline"
                to="/new-inventory"
            >
                add a new item
            </Link>
            <p className="text-teal-900 font-serif tracking-widest">OR</p>
        </div>
    )
}

export default Inventory;