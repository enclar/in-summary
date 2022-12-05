import { useState } from "react";
import NewStaff from "../components/NewUser/NewStaff";
import NewExtUser from "../components/NewUser/NewExtUser";

const NewUser = () => {
    const [accType, setAccType] = useState("staff");

    return (
        <div
            id="new-user"
            className="w-4/5 py-20 flex flex-col items-center"
        >
            <div className="px-10 py-2">
                <p className="text-sky-900 text-xl text-center">add a new user</p>
                <div className="mt-5 flex gap-4">
                    <label className="flex gap-2">
                        <input type="radio" name="acc-type" value="staff" onClick={() => setAccType("staff")} defaultChecked />
                        staff
                    </label>
                    <label className="flex gap-2">
                        <input type="radio" name="acc-type" value="external-user" onClick={() => setAccType("external-user")} />
                        external user
                    </label>
                </div>
            </div>
            {
                accType === "staff" ?
                <NewStaff /> :
                <NewExtUser />
            }
        </div>
    )
}

export default NewUser;