import { useEffect } from "react";
import { useAtom } from "jotai";
import { staffAtom } from "../../pages/NewProject";

const StaffAccounts = () => {
    const [staff, setStaff] = useAtom(staffAtom);

    // function to fetch all staff accounts
    useEffect(() => {
        const getStaff = async () => {
            try {
                const response = await fetch("/api/staff/all", {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        token: JSON.parse(localStorage.getItem("token"))
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    console.log("fetched all staff:", data);
                    setStaff(data);
                } else {
                    console.log("server error:", data.error);
                }
            } catch (error) {
                console.log("client error:", error);
            }
        };

        getStaff();
    }, []);

    return (
        <table id="staff-accounts">
            <thead>
                <tr>
                    <th className="px-5 border-2">name</th>
                    <th className="px-5 border-2">email</th>
                    <th className="px-5 border-2">contact number</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    staff?.map((staff, index) => {
                        return (
                            <tr key={index}>
                                <td className="px-5 border-2 text-center">{staff?.name}</td>
                                <td className="px-5 border-2 text-center">{staff?.email}</td>
                                <td className="px-5 border-2 text-center">{staff?.contactNum}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default StaffAccounts;