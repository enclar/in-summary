import { useFormContext } from "react-hook-form";

const NewAccount = () => {
    const { register } = useFormContext();

    return (
        <div
            id="new-account-form"
            className="flex flex-col items-center gap-4"
        >
            <section className="bg-sky-700 p-6 rounded-lg flex flex-col items-center gap-4">
                <legend className="text-slate-300 text-lg">account details</legend>
                <label className="text-slate-300 flex flex-col">
                    account username
                    <input
                        {...register("username")}
                        required={true}
                        className="bg-slate-100 px-1 text-slate-700"
                    />
                </label>
                <label className="text-slate-300 flex flex-col">
                    email
                    <input
                        {...register("email")}
                        required={true}
                        className="bg-slate-100 px-1 text-slate-700"
                    />
                </label>
                <label className="text-slate-300 flex flex-col">
                    password
                    <input
                        {...register("password")}
                        type="password"
                        required={true}
                        className="bg-slate-100 px-1 text-slate-700"
                    />
                </label>
                <div>
                    <label className="mt-2 text-slate-300 flex gap-1">
                        <input type="checkbox" {...register("company")} />
                        this is a company
                    </label>
                    <label className="mt-2 text-slate-300 flex gap-1">
                        <input type="checkbox" {...register("admin")} />
                        grant admin access
                    </label>
                </div>

            </section>
        </div>
    )
}

export default NewAccount;