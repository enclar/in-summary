import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    // setting up navigationg
    const navigate = useNavigate();

    // setting up react hook form
    const { register, handleSubmit } = useForm();

    // function to handle login
    const handleLogin = async (data) => {
        const details = {
            email: data.email,
            password: data.password
        };

        console.log(data);

        const url = `/api/auth/login/${data.accountType}`

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(details)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("successfully logged in:", data);
                localStorage.setItem("currUser", JSON.stringify(data.user));
                localStorage.setItem("token", JSON.stringify(data.token));
                navigate("/projects");
            } else {
                console.log("server error:", data.error);
                toast.error(data.error, { toastId: "login-fail-msg" });
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <div id="login" className="p-20 min-h-screen font-serif flex flex-col items-center justify-center">
            <form
                id="login-form"
                className="w-full flex flex-col items-center font-serif"
                method="post"
                autoComplete="off"
                onSubmit={handleSubmit(handleLogin)}
            >
                <legend
                    id="login-legend"
                    className="w-2/5 py-10 rounded-t-3xl text-2xl italic tracking-widest font-bold text-center text-stone-50 bg-lime-900/40"
                >
                    welcome to your daily summary
                </legend>

                <div className="border-4 p-10 rounded-b-3xl border-lime-900/40 border-t-0 w-2/5 flex flex-col items-center gap-5 bg-slate-50/60">
                    <label className="text-teal-900 w-3/5 text-lg tracking-wider flex flex-col">
                        email
                        <input
                            required
                            type="email"
                            id="login-email-input"
                            className="bg-stone-300 text-slate-700 p-1 tracking-wide"
                            {...register("email")}
                        />
                    </label>

                    <label className="text-teal-900 w-3/5 text-lg tracking-wider flex flex-col">
                        password
                        <input
                            required
                            type="password"
                            id="login-password-input"
                            className="bg-stone-300 text-slate-700 p-1 tracking-wide"
                            {...register("password")}
                        />
                    </label>

                    <label className="text-teal-900 mt-5 w-2/5 text-lg tracking-wider flex flex-col items-center gap-1">
                        i'm logging in as a
                        <select
                            id="acc-type-select"
                            className="bg-stone-300 text-slate-700 p-1 tracking-wide"
                            {...register("accountType")}
                        >
                            <option>staff</option>
                            <option>client</option>
                        </select>
                    </label>

                    <button
                        id="login-btn"
                        className="bg-teal-900 text-slate-50 mt-10 py-1 px-4 rounded-full tracking-widest italic hover:bg-teal-800"
                    >
                        login
                    </button>

                    <p className="text-teal-900 text-center mt-5 font-bold text-lg tracking-widest italic">
                        click{" "}
                        <span
                            id="go-to-login"
                            className="underline hover:text-teal-600 hover:cursor-pointer"
                            onClick={() => navigate("/enquiry")}
                        >
                            here
                        </span>
                        {" "}if you're new and want to submit an enquiry!
                    </p>
                </div>

            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;