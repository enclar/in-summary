import { useState } from "react";

const Login = () => {
    // setting up state
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: ""
    });

    // function to handle typing in inputs
    const handleTyping = (event, field) => {
        setLoginDetails({...loginDetails, [`${field}`]: event.target.value});
    };

    return (
        <div id="login" className="my-24">
            <form className="flex flex-col items-center gap-3">
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
                <button className="mt-5 px-4 py-1 rounded-full bg-stone-600 text-slate-100 ">
                    login
                </button>
            </form>
        </div>
    )
}

export default Login;