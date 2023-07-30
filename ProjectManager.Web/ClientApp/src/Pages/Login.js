import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuthorization } from '../components/AuthorizationContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    );
    const history = useHistory();
    const [isValid, setIsValid] = useState(true);
    const {setUser} = useAuthorization();
    const onTextChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', formData);
        const isValid = !!data;
        setIsValid(isValid)
        if (isValid) {
            setUser(data);
            history.push('/');
        }
    }
    return (<div className='container col-md-5 mt-3'>
        <form className='card card-body bg-light' onSubmit={onFormSubmit}>
            <h3>Login</h3>
            {!isValid && <p className='text-danger'>Invalid username or password</p>}
            <input type='email' onChange={onTextChange} className='form-control mt-3' placeholder='Email' name='email'></input>
            <input type='password' onChange={onTextChange} className='form-control mt-3' placeholder='Password' name='password'></input>
            <button className='btn btn-primary col-md-4 mt-3'> Login</button>
            <Link to='/register'>Register for a new account</Link>
        </form>
    </div>)
}
export default Login;
