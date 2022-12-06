import { useState } from "react";
import NewContact from "../components/NewUser/NewContact";

const NewUser = () => {
    const [accType, setAccType] = useState("staff");

    return (
        <div
            id="new-user"
            className="w-4/5 py-20 flex flex-col items-center"
        >
            <p className="text-sky-800 text-xl text-center">add a new contact</p>
            <NewContact />
        </div>
    )
}

export default NewUser;