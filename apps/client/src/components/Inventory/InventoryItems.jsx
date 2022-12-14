import { useAtom } from "jotai";
import { filteredInventoryAtom } from "../../pages/Inventory";
import ItemCard from "./ItemCard";

const InventoryItems = () => {
    const [filtered, setFilteredInventory] = useAtom(filteredInventoryAtom);

    return (
        <div id="inventory-items" className="w-4/5 flex gap-10 flex-wrap justify-center">
            { 
                filtered?.map((item, index) => {
                    return (
                        <ItemCard item={item} key={index} />
                    )
                })
            }
        </div>
    )
}

export default InventoryItems;