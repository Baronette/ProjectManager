import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState(
        {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    );
    const history = useHistory();

    const onTextChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const onFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post('api/account/register', formData)
        history.push('/login');
    }

    return (
        <div className='container col-md-5 mt-3'>
            <form className='card card-body bg-light' onSubmit={onFormSubmit}>
                <h3>Register for an account</h3>
                <input type='text' onChange={onTextChange} className='form-control mt-3' placeholder='First Name' name='firstName'></input>
                <input type='text' onChange={onTextChange} className='form-control mt-3' placeholder='Last Name' name='lastName'></input>
                <input type='email' onChange={onTextChange} className='form-control mt-3' placeholder='Email' name='email'></input>
                <input type='password' onChange={onTextChange} className='form-control mt-3' placeholder='Password' name='password'></input>
                <button className='btn btn-primary col-md-4 mt-3'> Register</button>
            </form>
        </div>
    )
}
export default Register;
