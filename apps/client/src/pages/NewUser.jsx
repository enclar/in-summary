import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";

const NewUser = () => {
    // setting up react hook form
    const { register, onSubmit } = useForm();

    // accessing local storage
    const token = JSON.stringify(localStorage.getItem("token"));
    const currUser = JSON.stringify(localStorage.getItem("currUser"));

    return (
        <div id="new-user">
            
        </div>
    )
}

export default NewUser;