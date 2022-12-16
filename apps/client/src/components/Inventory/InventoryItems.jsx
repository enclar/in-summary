import { useAtom } from "jotai";
import { inventoryAtom } from "../../pages/Inventory";
import ItemCard from "./ItemCard";

const InventoryItems = () => {
    const [inventory, setInventory] = useAtom(inventoryAtom);

    return (
        <div id="inventory-items" className="mt-5 w-4/5 flex gap-10 flex-wrap justify-center">
            { 
                inventory?.map((item, index) => {
                    return (
                        <ItemCard item={item} key={index} />
                    )
                })
            }
        </div>
    )
}

export default InventoryItems;