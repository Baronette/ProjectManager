import React, {useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { useAuthorization } from '../components/AuthorizationContext';


const Logout = () =>{
    const history = useHistory();
    const {setUser} = useAuthorization();

    useEffect(() => {
        const logout = async () => {
            setUser(null);
            await axios.post('/api/account/logout');
        }        
        logout();
        history.push('/');

    });

    return <></>
}
export default Logout;