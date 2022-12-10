import { checkpointAtom } from "./Timeline";
import { useAtom } from "jotai";

const CheckpointTable = () => {
    const [checkpoints, setCheckpoints] = useAtom(checkpointAtom);

    // function to delete checkpoint
    const deleteCheckpoint = async (checkpoint_id) => {
        const url = "/api/checkpoints/delete/" + checkpoint_id
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    token: JSON.parse(localStorage.getItem("token"))
                }
            });

            const data = await response.json();

            if (response.ok) {
                console.log("deleted checkpoint:", data);
                const filtered = checkpoints?.filter((checkpoint) => checkpoint.id !== data.id);
                setCheckpoints(filtered);
            } else {
                console.log("server error:", data.error);
            }
        } catch (error) {
            console.log("client error:", error)
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    <th className="border-2">date</th>
                    <th className="border-2">checkpoint</th>
                </tr>
            </thead>
            <tbody>
                {
                    checkpoints?.map((checkpoint, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-5 border-2 text-center">{checkpoint?.date?.slice(0, 10)}</td>
                                <td className="px-5 border-2">{checkpoint?.details}</td>
                                <td
                                    onClick={() => deleteCheckpoint(checkpoint.id)}
                                    className="px-5 border-2 text-center hover:cursor-pointer hover:underline"
                                >remove</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default CheckpointTable;