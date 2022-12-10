import { checkpointAtom } from "./Timeline";
import { useAtom } from "jotai";

const CheckpointTable = () => {
    const [checkpoints, setCheckpoints] = useAtom(checkpointAtom);

    // function to delete checkpoint
    const deleteCheckpoint = async () => {
        try {

        } catch (error) {
            console.log("client error:", error)
        }
    }

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
                                <td className="px-5 border-2 text-center">remove</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default CheckpointTable;