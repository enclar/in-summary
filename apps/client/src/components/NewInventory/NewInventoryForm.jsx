import { useForm } from "react-hook-form";

const NewInventoryForm = () => {
    const { register, handleSubmit } = useForm();

    return (
        <form>
            <label>
                name
                <input {...register("name")} />
            </label>

            <label>
                description
                <textarea {...register("description")} />
            </label>

            <label>
                quantity
                <input type="number" {...register("quantity")} />
            </label>
        </form>
    )
}

export default NewInventoryForm;