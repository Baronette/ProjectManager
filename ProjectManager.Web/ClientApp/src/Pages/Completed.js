import axios from "axios";
import React, { useEffect, useState } from "react";

const Completed = () => {
    const [projects, setProjects] = useState();
    useEffect(() => {
        const getCompleted = async () => {
            const { data } = await axios.get(`api/projects/getcompleted`)
            setProjects(data);
        }
        getCompleted();
    },[])
    return (
        <div className="container col-md-6 mt-4">
            {projects && <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Manager</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((p, i) => {
                        return <tr key={i}>
                            <td>{p.title}</td>
                            <td>
                                Completed by {p.user.firstName} {p.user.lastName}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>}
            </div>
            )
}

            export default Completed;