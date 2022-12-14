import { useState } from "react";
import { useAtom } from "jotai";
import { inventoryAtom } from "../../pages/Inventory";

const ItemCard = ({ item }) => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    const [editing, setEditing] = useState("");
    const [inventory, setInventory] = useAtom(inventoryAtom);

    // function to edit an item
    const editItem = async () => {
        const itemStatus = document.getElementById("item-status").value;

        const updatedItem = {
            name: document.getElementById("item-name").value,
            description: document.getElementById("item-description").value,
            canBeUsed: itemStatus === "available" ? true : false
        };

        const url = "/api/inventory/update/" + item?.id;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                },
                body: JSON.stringify(updatedItem)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("updated item:", data);
                const filtered = inventory?.filter((inventory) => inventory?.id !== data?.id);
                filtered.unshift(data);
                setInventory(filtered);
                setEditing("");
            } else {
                console.log("server error:", data.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <div id="item-card" className="border-double border-4 p-10 w-1/4 font-serif flex flex-col items-center gap-5 justify-between">
            <div className="flex flex-col gap-3 items-center">
                <img src={item?.imageUrl} className="w-7/8 max-h-60 object-cover object-center" />

                {
                    editing === item?.id ?
                    <div className="w-full flex flex-col gap-3">
                        <label className="flex flex-col items-center text-teal-900 tracking-wider">
                            name
                            <input className="bg-orange-50 text-slate-700 p-1" id="item-name" defaultValue={item?.name} />
                        </label>
                        <label className="flex flex-col items-center text-teal-900 tracking-wider">
                            description
                            <textarea className="bg-orange-50 w-full h-20 p-1 text-slate-700" id="item-description" defaultValue={item?.description} />
                        </label>
                    </div>
                    :
                    <div className="flex flex-col items-center">
                        <p className="text-teal-900 mt-4 tracking-wider font-semibold italic">{item?.name}</p>
                        <p className="text-slate-700 tracking-wide leading-5">{item?.description}</p>
                    </div>
                }

            </div>

            <label className="text-teal-900 italic font-medium flex gap-2 tracking-wider">
                status:
                {
                    editing === item?.id ?
                    <select
                        className="px-1"
                        defaultValue={ item?.canBeUsed ? "available" : "under maintenance"}
                        id="item-status"
                    >
                        <option>available</option>
                        <option>under maintenance</option>
                    </select>
                    :
                    <p>{ item?.canBeUsed ? "available" : "under maintenance"}</p>
                }

            </label>


            {
                user?.accType === "staff" ?
                <div className="mt-5 flex gap-5">
                    {
                        editing === item?.id ?
                        <button className="bg-teal-900 px-5 rounded-full text-slate-50 tracking-wider" onClick={editItem}>update item details</button> :
                        <>
                            <button className="bg-teal-900 px-5 rounded-full text-slate-50 tracking-wider" onClick={() => setEditing(item?.id)}>edit</button>
                            <button className="bg-teal-900 px-5 rounded-full text-slate-50 tracking-wider">delete</button>
                        </>
                    }
                </div>
                :
                <></>
            }
        </div>
    )
}

export default ItemCard;