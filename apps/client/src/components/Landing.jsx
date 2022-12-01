import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <div
            id="landing"
            className="my-24 flex justify-center gap-10"
        >
            <Link
                to="/login"
                className="bg-slate-500 text-slate-50 py-1 px-4 rounded-full hover:bg-slate-200 hover:text-slate-500"
            >
                login
            </Link>
            <Link
                to="/"
                className="bg-slate-500 text-slate-50 py-1 px-4 rounded-full hover:bg-slate-200 hover:text-slate-500"
            >
                submit enquiry
            </Link>
        </div>
    )
}

export default Landing;