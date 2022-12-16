import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div
            id="landing"
            className="p-20 min-h-screen flex flex-col items-center justify-center font-serif"
        >
            <div className="bg-lime-900/40 p-16 rounded-3xl flex flex-col items-center gap-16">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-slate-50 text-3xl tracking-widest font-bold italic">in summary;</p>
                    <p className="text-orange-100 text-xl tracking-widest font-medium">helping you manage your events one step at a time</p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <p className="text-slate-50 text-lg tracking-wider font-medium">for existing staff & clients</p>
                    <Link
                        to="/login"
                        className="bg-amber-300 text-lg tracking-widest font-semibold italic text-stone-500 py-1 px-4 rounded-full hover:bg-amber-200"
                    >
                        login
                    </Link>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <p className="text-slate-50 text-lg tracking-wider font-medium">if you're new here</p>
                    <Link
                        to="/enquiry"
                        className="bg-amber-300 text-lg tracking-widest font-semibold italic text-stone-500 py-1 px-4 rounded-full hover:bg-amber-200"
                    >
                        submit enquiry
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;