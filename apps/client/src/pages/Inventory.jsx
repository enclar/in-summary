import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { atom, useAtom } from "jotai";
import InventoryItems from "../components/Inventory/InventoryItems";

export const inventoryAtom = atom([]);

const Inventory = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));

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

        getInventory();
    }, []);

    if (!user) {
        return <Navigate replace to="/login" />
    } else {
        return (
            <div id="inventory" className="mt-10 mb-20 w-screen flex flex-col items-center gap-10">
                {
                    user?.accType === "staff" ?
                    <>
                        <Link
                            className="text-teal-900 font-serif tracking-widest italic font-semibold hover:underline"
                            to="/new-inventory"
                        >
                            add a new item
                        </Link>
    
                        <p className="text-teal-900 font-serif tracking-widest">OR</p>
                    </>
                    :
                    <></>
                }
    
                <label className="text-teal-900 font-serif tracking-widest italic font-semibold flex flex-col items-center gap-5">
                    explore the inventory
                    <InventoryItems />
                </label>
    

            </div>
        )
    }
}

export default Inventory;