import CurrClientDetails from "../components/AllAccounts/CurrClientDetails";
import StaffAccounts from "../components/AllAccounts/StaffAccounts";

const ClientAccount = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="client-account" className="px-10 py-20 w-full min-h-screen flex flex-col items-center gap-20 font-serif">
            <label className="flex flex-col items-center gap-5 italic text-teal-900 tracking-widest font-semibold">
                reach out to us
                <StaffAccounts />
            </label>

        </div>

    )
}

export default ClientAccount;