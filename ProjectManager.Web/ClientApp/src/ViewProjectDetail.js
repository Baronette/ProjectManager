import { HubConnectionBuilder } from "@microsoft/signalr";
import { format } from "date-fns";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useLocation } from 'react-router-dom'

const ViewProjectDetail = (project) => {
    useEffect(() => {
        const connectToHub = async () => {
            const connection = new HubConnectionBuilder().withUrl("/projects").build();
            await connection.start();
            connectionRef.current = connection;
            connection.on('comment', comment => {
                setAllComments(allComments => [...allComments, comment])
            })
        }
        connectToHub();
        setAllComments(comments)
        console.log(allComments)
    }, [])
    const [text, setText] = useState();
    const location = useLocation();
    const { project: { id, title, date, user, comments, description } } = location.state
    const [allComments, setAllComments] = useState(comments);
    const connectionRef = useRef(null)
    const emailLink = `mailto:${user.email}`;
    const onSubmitClick = () => {
        connectionRef.current.invoke('addcomment', { text, projectId: id })
        setText('')
    }
    return (
        <div className='container col-md-6 mt-5'>
            <h2>{title}</h2>
            <h4>Due by: {format(new Date(date), 'MM/dd/yyyy')}</h4>
            {user ? <><h6>Managed by: {user.firstName} {user.lastName}</h6><a href={emailLink} >{user.email}</a></> :
             <h6>No Manager</h6>}
             <br/>
             <br/>
            <p className="font-italic">{description}</p>
            {allComments && allComments.map((c, i) => {
                return <div className="card mt-2" key={i}>
                    <div className="card-header">
                        {c.user.firstName} {c.user.lastName}   
                    </div>
                    <div className="card-body">
                        <p className="card-text">{c.text}</p>
                    </div>
                </div>
            })}

            <div className="card my-4">
                <h5 className="card-header">AddComment:</h5>
                <div className="card-body">
                    <div className="form-group">
                        <div className="form-group">
                            <textarea className='form-control' onChange={e => setText(e.target.value)} placeholder='Your Comment here'
                                type='text' rows='3' />
                        </div>
                        <button onClick={onSubmitClick}
                            className="btn btn-primary">Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ViewProjectDetail