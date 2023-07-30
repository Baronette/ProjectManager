import { Modal } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { useAuthorization } from "../components/AuthorizationContext";
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState();
    const [description, setDescription] = useState();
    const { user } = useAuthorization();
    const connectionRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/projects").build();
            await connection.start();
            connection.invoke('onlogin');
            connectionRef.current = connection;
            connection.on('new-project', project => {
                setProjects(projects => [...projects, project]);
            });
            connection.on('projects', projects => {
                setProjects(projects);
            })
            connection.on('users', users => setUsers(users));

        }
        connectToHub();
    }, []);

    const onAddProject = () => {
        connectionRef.current.invoke('newProject', { date, title, description });
        setTitle('');
        setShow(false)
    }
    const onCompleteClick = p => {
        connectionRef.current.invoke('MarkCompleted', p)
    }
    const onAssignClick = (email, projectId) => {
        connectionRef.current.invoke('AssignProject', { email, projectId })
    }
    const currentDate = () => {
        return format(new Date(), 'MM/dd/yyyy');
    }

    return (

        <div className="container col-md-8">
            <div className="row col-md-4">
                <button className="btn btn-primary mt-4" onClick={() => setShow(true)}>Add Project</button>
            </div>
            <table className="table table-striped table-bordered table-hover mt-4">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Deadline</th>
                        <th>Manager</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((p, i) => {
                        return <tr key={i} className="accordion" >
                            <td>{p.title}</td>
                            <td className={p.date < currentDate() ? "text-danger" : ""}>{format(new Date(p.date), 'MM/dd/yyyy')}</td>
                            <td className="text-center">
                                {!p.userId &&
                                    <select className="custom-select" onChange={e => onAssignClick(e.target.value, p.id)}>
                                        <option defaultValue={undefined}>Assign Manager</option>
                                        {users && users.map((u, i) => {
                                            return <option key={i} value={u.email}>{u.firstName} {u.lastName}</option>
                                        })}
                                    </select>}
                                {p.userId && <p className="font-weight-bold">{p.user.firstName} {p.user.lastName}</p>}
                                {p.userId === user.id && <button className="btn btn-light btn-sm"
                                    onClick={() => onCompleteClick(p)}>Mark Completed</button>}
                            </td>
                            <td className='text-center'>{p.comments && p.comments.length} Comments
                                <br />
                                <button className="btn btn-small btn-link"
                                    onClick={() => history.push('/viewprojectdetail', { project: p })}>View Project Details
                                </button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <Modal show={show} className='fade modal-dialog'>
                <div className="modal-header">
                    <h5 className="modal-title">Add New Project</h5>
                    <button className="close" onClick={() => setShow(false)} >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <input className='form-control' type='text' placeholder="Project Title" onChange={e => setTitle(e.target.value)} />
                    <input type='date' className="form-control mt-3" min={currentDate()} onChange={e => setDate(e.target.value)} />
                    <textarea className='form-control mt-3' onChange={e => setDescription(e.target.value)} placeholder='Project Description'
                        type='text' rows='3' />
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="button" className="btn btn-primary" onClick={onAddProject}>Save changes</button>
                </div>
            </Modal>

        </div>

    )
}
export default Home;