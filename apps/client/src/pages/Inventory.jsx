import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { atom, useAtom } from "jotai";
import InventoryItems from "../components/Inventory/InventoryItems";

export const inventoryAtom = atom([]);
export const filteredInventoryAtom = atom([]);

const Inventory = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));

    const [inventory, setInventory] = useAtom(inventoryAtom);
    const [filteredInventory, setFilteredInventory] = useAtom(filteredInventoryAtom);

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
                    setFilteredInventory(data);
                } else {
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

        getInventory();
    }, []);

    // filter inventory to be shown
    const filterInventory = (params) => {
        if (params === "all") {
            setFilteredInventory(inventory);
        } else if (params === "available") {
            const available = inventory?.filter(item => item?.canBeUsed === true);
            setFilteredInventory(available);
        } else if (params === "maintenance") {
            const unavailable = inventory?.filter(item => item?.canBeUsed === false);
            setFilteredInventory(unavailable);
        }
    };

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

            <label className="text-teal-900 font-serif tracking-widest italic font-semibold flex flex-col items-center gap-2">
                filter inventory
                <div className="flex gap-5">
                    <label className="flex gap-2 items-center font-normal not-italic">
                        <input type="radio" name="availability" onClick={() => filterInventory("all")} defaultChecked={true} />
                        all inventory
                    </label>

                    <label className="flex gap-2 items-center font-normal not-italic">
                        <input type="radio" name="availability" onClick={() => filterInventory("available")} />
                        avilable for use
                    </label>

                    <label className="flex gap-2 items-center font-normal not-italic">
                        <input type="radio" name="availability" onClick={() => filterInventory("maintenance")} />
                        under maintenance
                    </label>
                </div>
            </label>

            <InventoryItems />
        </div>
    )
}

export default Inventory;