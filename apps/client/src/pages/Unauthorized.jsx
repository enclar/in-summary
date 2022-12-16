const Unauthorized = () => {
    return (
        <div id="unauth" className="px-10 py-20 w-screen min-h-screen flex flex-col items-center gap-4">
            <p id="unauth-msg" className="font-serif text-red-700 text-lg tracking-wider italic font-bold">you are not authorized to access this page</p>
        </div>
    )
}

export default Unauthorized;