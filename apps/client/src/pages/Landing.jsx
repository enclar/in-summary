import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div
            id="landing"
            className="p-20 min-h-screen flex flex-col items-center justify-center font-serif"
        >
            <div className="border-double border-8 border-teal-900 bg-slate-50/40 p-16 rounded-3xl flex flex-col items-center gap-16">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-teal-900 text-3xl tracking-widest font-bold italic">in summary;</p>
                    <p className="text-slate-700 text-xl tracking-widest font-normal">helping your manage your events one step at a time</p>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <p className="text-teal-900 text-lg tracking-wider font-medium">for existing staff & clients</p>
                    <Link
                        to="/login"
                        className="bg-teal-900 text-lg tracking-widest font-semibold italic text-slate-50 py-1 px-4 rounded-full hover:bg-teal-800"
                    >
                        login
                    </Link>
                </div>

                <div className="flex flex-col items-center gap-3">
                    <p className="text-teal-900 text-lg tracking-wider font-medium">if you're new here</p>
                    <Link
                        to="/enquiry"
                        className="bg-teal-900 text-lg tracking-widest font-semibold italic text-slate-50 py-1 px-4 rounded-full hover:bg-teal-800"
                    >
                        submit enquiry
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Landing;