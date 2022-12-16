const CurrClientDetails = () => {
    const user = JSON.parse(localStorage.getItem("currUser"));

    return (
        <div id="curr-client-details" className="w-full flex flex-col items-center">
            <p className="w-1/5 bg-lime-900/40 text-center text-slate-50 px-10 py-5 italic tracking-widest rounded-t-xl font-semibold">your information</p>
            <div className="border-4 w-1/5 border-lime-900/40 p-10 rounded-b-xl flex flex-col items-center">
                <p >{user?.name?.toUpperCase()}</p>
                <p>{user?.email}</p>
            </div>
        </div>
    )
}

export default CurrClientDetails;