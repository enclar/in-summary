import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import NewAccount from "./NewAccount";

const NewContact = () => {
    const [createAcc, setCreateAcc] = useState(false);

    const methods = useForm();
    const register = methods.register

    // function to handle creation of new contacts and accounts
    const onSubmit = async (data) => {
        if (createAcc) {
            const newContact = {
                contact_name: data.contact_name,
                contact_number: data.contact_number,
                category: data.category
            };

            const newAccount = {
                username: data.username,
                email: data.email,
                password: data.password,
                account_type: data.category,
                company: data.company,
                admin: data.admin,
            }

            data = { contact: newContact, account: newAccount }
        }

        try {
            const responseContact = await fetch("/api/users/new-contact", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.contact)
            });

            const dataContact = await responseContact.json();

            if (responseContact.ok) {
                console.log("successfully added new contact");
                console.log("contact details:", dataContact);
                toast.success(`A new contact has been created for ${dataContact.contact_name}!`)

                const responseAccount = await fetch("/api/users/new-account", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...data.account, contact_details: dataContact.contact_id})
                });

                const dataAccount = await responseAccount.json();

                if (responseAccount.ok) {
                    console.log("successfully added new account");
                    console.log("account details:", data);
                    toast.success(`A new account has been created for ${dataAccount.username}!`);
                } else {
                    console.log("server error:", dataAccount.error);
                    toast.error(dataAccount.error);
                }
            } else {
                console.log("server error:", dataContact.error);
                toast.error(dataContact.error);
            }
        } catch (error) {
            console.log("client error:", error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                id="new-contact-form"
                className="mt-8 flex flex-col items-center gap-4"
                autoComplete="off"
                method="post"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <div id="input details" className="mt-6 flex gap-10 items-start">
                    <section className="bg-sky-700 p-6 rounded-lg flex flex-col items-center gap-4">
                        <legend className="text-slate-300 text-lg">contact details</legend>
                        <label className="text-slate-300 flex flex-col">
                            name
                            <input
                                {...register("contact_name")}
                                required={true}
                                className="bg-slate-100 px-1 text-slate-700"
                            />
                        </label>
                        <label className="text-slate-300 flex flex-col">
                            contact number
                            <input
                                {...register("contact_number")}
                                required={true}
                                className="bg-slate-100 px-1 text-slate-700"
                            />
                        </label>
                        <label className="mt-2 text-slate-300 flex gap-2 items-center">
                            account type:
                            <select {...register("category")} className="text-slate-700">
                                <option value="client">staff</option>
                                <option value="client">client</option>
                                <option value="vendor">vendor</option>
                                <option value="other">other</option>
                            </select>
                        </label>
                        <label className="mt-2 text-slate-300 flex gap-1">
                            <input
                                id="create-acc"
                                type="checkbox"
                                checked={createAcc}
                                onChange={() => setCreateAcc(!createAcc)}
                            />
                            also create account for this user
                        </label>
                    </section>

                    {
                        createAcc ?
                        <NewAccount />:
                        <></>
                    }
                </div>
                <button className="bg-sky-900 px-8 py-2 mt-6 rounded-full text-slate-50 hover:text-sky-200">
                    create { !createAcc ? "contact" : "contact & account" }
                </button>
            </form>
            <ToastContainer />
        </FormProvider>
    )
}

export default NewContact;