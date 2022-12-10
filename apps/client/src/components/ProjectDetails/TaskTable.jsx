import { taskAtom } from "./Tasks";
import { useAtom } from "jotai";

const TaskTable = () => {
    const [tasks] = useAtom(taskAtom);

    return (
        <table id="task-table">
            <thead>
                <tr>
                    <th className="border-2">due by</th>
                    <th className="border-2">task</th>
                    <th className="border-2 px-5">action from</th>
                    <th className="border-2 px-5">completed?</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks?.map((task, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-5 border-2">{task?.dueBy?.slice(0, 10)}</td>
                                <td className="px-5 w-2/5 border-2">{task?.description}</td>
                                <td className="px-5 border-2 text-center">{task?.doneBy}</td>
                                <td className="px-5 border-2 text-center">
                                    <input type="checkbox" />
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TaskTable;