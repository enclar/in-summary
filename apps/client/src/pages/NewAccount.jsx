import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NewStaffForm from "../components/NewAccount/NewStaffForm";
import NewClientForm from "../components/NewAccount/NewClientForm";
import AdminNavbar from "../components/Navbars/AdminNavbar";

const NewAccount = () => {
    // setting up state
    const [accountType, setAccountType] = useState("staff");
    const user = JSON.parse(localStorage.getItem("currUser"));

    const displayForm = () => {
        if ( accountType === "staff" ) {
            return <NewStaffForm />
        } else if (accountType === "client") {
            return <NewClientForm />
        }
    };

    if (!user) {
        return <Navigate replace to="/login" />
    } else if (user?.accType !== "staff") {
        return <Navigate replace to="/unauthorized" />
    } else {
        return (
            <div id="new-account" className="flex flex-col px-10 pt-10 pb-20 items-center font-serif w-full">
                <AdminNavbar />
                <p className="mt-10 w-2/5 p-10 rounded-t-xl text-center text-lg text-slate-50 tracking-widest italic font-bold bg-lime-900/40">create a new account</p>
                <div className="w-2/5 px-5 py-10 border-4 border-t-0 border-lime-900/40 rounded-b-xl flex flex-col items-center gap-5">
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

}

export default NewAccount;