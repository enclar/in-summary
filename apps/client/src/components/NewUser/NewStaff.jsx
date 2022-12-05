import { useForm } from "react-hook-form";

const NewStaff = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form
            id="new-staff-form"
            className="mt-8 flex flex-col items-center gap-4"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <label className="flex flex-col">
                username:
                <input
                    {...register("username")}
                    required={true}
                    className="bg-slate-100 px-1"
                />
            </label>
            <label className="flex flex-col">
                email:
                <input
                    {...register("email")}
                    required={true}
                    className="bg-slate-100 px-1"
                />
            </label>
            <label className="flex flex-col">
                password:
                <input
                    {...register("password")}
                    type="password"
                    required={true}
                    className="bg-slate-100 px-1"
                />
            </label>
            <label className="flex flex-col">
                contact:
                <input
                    {...register("contact")}
                    required={true}
                    className="bg-slate-100 px-1"
                />
            </label>
            <label className="mt-4 flex gap-1">
                <input
                    type="checkbox"
                    {...register("admin")}
                />
                admin
            </label>
            <button className="bg-sky-900 px-8 py-2 mt-10 rounded-full text-slate-50 hover:text-sky-200">
                create account
            </button>
        </form>
    )
}

export default NewStaff