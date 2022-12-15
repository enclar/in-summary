import { useState } from "react";
import { ToastContainer } from "react-toastify";

import NewStaffForm from "../components/NewAccount/NewStaffForm";
import NewClientForm from "../components/NewAccount/NewClientForm";

const NewAccount = () => {
    // setting up state
    const [accountType, setAccountType] = useState("staff");

    const displayForm = () => {
        if ( accountType === "staff" ) {
            return <NewStaffForm />
        } else if (accountType === "client") {
            return <NewClientForm />
        }
    };

    return (
        <div id="new-user" className="flex flex-col mb-20 items-center font-serif w-1/3">
            <p className="w-full py-4 text-center text-lg text-teal-900 tracking-wide italic font-bold border-double border-4">create a new account</p>
            <div className="w-full px-5 py-10 border-4 border-t-0 flex flex-col items-center gap-5">
                <label className="flex flex-col items-center text-teal-900 tracking-wider font-semibold italic gap-1">
                    account type:
                    <div className="flex gap-5">
                        <label className="flex gap-2 items-center font-normal not-italic">
                            <input type="radio" name="account-type" onClick={() => setAccountType("staff")} defaultChecked={true} />
                            staff
                        </label>

                        <label className="flex gap-2 items-center font-normal not-italic">
                            <input type="radio" name="account-type" onClick={() => setAccountType("client")} />
                            client
                        </label>
                    </div>
                </label>
                { displayForm() }
            </div>
            <ToastContainer />
        </div>
    )
}

export default NewAccount;