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
                </tr>
            </thead>
                {
                    tasks?.map((task, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-5 border-2">{task?.dueBy}</td>
                                <td className="px-5 border-2">{task?.description}</td>
                                <td className="px-5 border-2 text-center">{task?.doneBy}</td>
                            </tr>
                        )
                    })
                }
            <tbody>

            </tbody>
        </table>
    )
}

export default TaskTable;