import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
    const navigate = useNavigate()
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})
            .then((res) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            <button type="button" class="btn btn-light  btn-sm" onClick={logout}>Logout</button>
        </div>
)}

export default Logout;