const Unauthorized = () => {
    return (
        <div id="enquiries" className="mb-20 w-4/5 flex flex-col items-center gap-4">
            <p id="unauth-msg" className="font-serif text-teal-900 text-lg tracking-wider italic font-bold">you are not authorized to access this page</p>
        </div>
    )
}

export default Unauthorized;