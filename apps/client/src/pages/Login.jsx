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
        <div id="login" className="my-24">
            <form
                id="login-form"
                className="flex flex-col items-center gap-3"
                method="post"
                autoComplete="off"
                onSubmit={handleSubmit(handleLogin)}
            >
                <legend
                    id="login-legend"
                    className="mb-5 text-stone-600 font-bold"
                >
                    too long; read later
                </legend>
                <label className="flex flex-col">
                    email:
                    <input
                        required
                        type="email"
                        id="login-email-input"
                        className="bg-slate-100 px-1"
                        {...register("email")}
                    />
                </label>
                <label className="flex flex-col">
                    password:
                    <input
                        required
                        type="password"
                        id="login-password-input"
                        className="bg-slate-100 px-1"
                        {...register("password")}
                    />
                </label>
                <label className="my-3 flex flex-col gap-2">
                    i'm logging in as a:
                    <select
                        className="bg-slate-100 p-1 tracking-wide"
                        {...register("accountType")}
                    >
                        <option>staff</option>
                        <option>client</option>
                        <option>vendor</option>
                    </select>
                </label>
                <button
                    id="login-btn"
                    className="mt-5 px-4 py-1 rounded-full bg-stone-600 text-slate-100 "
                >
                    login
                </button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;