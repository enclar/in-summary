import { useState, useEffect } from "react";
import ClientAccounts from "../components/AllAccounts/ClientAccounts";
import StaffAccounts from "../components/AllAccounts/StaffAccounts";

const AllAccounts = () => {
    // setting up state
    const [accountType, setAccountType] = useState("staff");

    const whichAccounts = () => {
        if (accountType === "staff") {
            return <StaffAccounts />
        } else if (accountType === "clients") {
            return <ClientAccounts />
        }
    };

    return (
        <div id="all-accounts" className="flex flex-col items-center gap-10 font-serif">
            <label className="flex flex-col items-center italic tracking-wider text-teal-900 font-semibold">
                view all accounts for:
                <div className="flex gap-5">
                    <label className="flex gap-2 items-center not-italic font-normal">
                        <input type="radio" name="account-type" onClick={() => setAccountType("staff")} defaultChecked={true} />
                        staff
                    </label>
                    <label className="flex gap-2 items-center not-italic font-normal">
                        <input type="radio" name="account-type" onClick={() => setAccountType("clients")} />
                        clients
                    </label>
                </div>
            </label>
            { whichAccounts() }
        </div>
    )
}

export default AllAccounts;