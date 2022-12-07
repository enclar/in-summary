const ProjectSummary = () => {
    return (
        <div id="proj-summary">
            <div className="bg-sky-200 p-3 rounded-md flex gap-20 items-end">
                <div className="flex flex-col">
                    <p>#wedding</p>
                    <p className="text-2xl tracking-wider">NICK & CARRIE</p>
                </div>
                <div className="flex flex-col items-end">
                    <p>27 May 2022</p>
                    <p>JW Mariott South Beach</p>
                    <p>I/C: Joyce</p>
                </div>
            </div>
            <div>
                <div className="border-2 p-3 rounded-md flex flex-col gap-3 items-center">
                    <p>CURRENTLY PENDING:</p>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-sm border-2 px-3">Item</th>
                                <th className="text-sm border-2 px-3">TBD By</th>
                                <th className="text-sm border-2 px-3">Due By</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-sm border-2 px-3">Get floor plan from JW</td>
                                <td className="text-sm border-2 px-3">Nick & Carrie</td>
                                <td className="text-sm border-2 px-3">-</td>
                            </tr>
                            <tr>
                                <td className="text-sm border-2 px-3">Send moodboard</td>
                                <td className="text-sm border-2 px-3">Joyce</td>
                                <td className="text-sm border-2 px-3">12 Dec </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div className="border-2 p-3 rounded-md flex flex-col gap-3 items-center">
                    <p>NEXT MEETING: 14 Dec 2022</p>
                    <table>
                        <thead>
                            <tr>
                                <th className="text-sm border-2 px-3">Agenda</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-sm border-2 px-3">1. Discuss moodboard and sketch conceptualisation</td>
                            </tr>
                            <tr>
                                <td className="text-sm border-2 px-3">2. Confirm venue floor plan and layout</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default ProjectSummary;