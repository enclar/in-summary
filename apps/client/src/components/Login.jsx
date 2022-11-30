import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    // setting up navigationg
    const navigate = useNavigate();

    // setting up state
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });

    // function to handle typing in inputs
    const handleTyping = (event, field) => {
        setLoginDetails({...loginDetails, [`${field}`]: event.target.value});
    };

    // function to handle login
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/staff/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginDetails)
            });
            
            const data = await response.json();

            if (response.ok) {
                console.log("successfully logged in:", data);
                // navigate("/home");
                toast.success("Successfully logged in!", {toastId: "login-pass-msg"});
            } else {
                console.log("server error:", data.error);
                toast.error(data.error, {toastId: "login-fail-msg"});
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <div id="login" className="my-24">
            <form
                className="flex flex-col items-center gap-3"
                method="post"
                autoComplete="off"
                onSubmit={() => handleLogin(event)}
            >
                <legend className="mb-5 text-stone-600 font-bold">
                    too long; read later
                </legend>
                <label className="flex flex-col">
                    email:
                    <input
                        type="email"
                        id="login-email-input"
                        className="bg-slate-100 px-1"
                        value={loginDetails.email}
                        onChange={() => handleTyping(event, "email")}
                    />
                </label>
                <label className="flex flex-col">
                    password:
                    <input
                        type="password"
                        id="login-password-input"
                        className="bg-slate-100 px-1"
                        value={loginDetails.password}
                        onChange={() => handleTyping(event, "password")}
                    />
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