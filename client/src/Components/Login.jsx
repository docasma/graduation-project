
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const nav = useNavigate();
    const [errors, setErrors] = useState({});
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    });

    const handleSuccessfulLogin = (token) => {
        localStorage.setItem('token', token);
    };

    const changeHandler = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };

    const loginHandler = (e) => {
        e.preventDefault();
        // Réinitialisation des erreurs avant la nouvelle tentative
        if ( !userLogin.email || !userLogin.password  ) {
            setErrors({
                email: userLogin.email ? '' : 'Email is required',
                password: userLogin.password ? '' : 'Password is required',
            });
            return;
        }


        axios.post('http://localhost:8000/api/login', userLogin, { withCredentials: true })
            .then((res) => {
                console.log(res);
                handleSuccessfulLogin(res.data.token); // Stocker le jeton JWT dans le localStorage
                nav('/Dashboard');
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                // Mise à jour de l'état des erreurs avec les erreurs renvoyées par le serveur
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="container">
            <form onSubmit={loginHandler} className='col-md-6 mx-auto mt-3 border border-4 rounded-5 text-light p-4 shadow-lg gap-3' style={{ background: 'linear-gradient(#7C3AED, #2F156D)' }}>
                <div>
                    <label className='form-label'>Email:</label>
                    <input className='form-control' type="text" name='email' value={userLogin.email} onChange={changeHandler} autoComplete="current-email" />
                    {errors.email && <p className='text-danger'>{errors.email}</p>}
                </div>
                <div>
                    <label className='form-label'>Password:</label>
                    <input className='form-control' type="password" name='password' value={userLogin.password} onChange={changeHandler} autoComplete="current-password" />
                    {errors.password && <p className='text-danger'>{errors.password}</p>}
                </div>
                <button className='btn btn-outline-primary col-12 mt-3'>Login</button>
                <br />
                <Link className='text-white mt-3' to={'/'}>Don't have an account? Click here to sign up</Link>
            </form>
        </div>
    );
}

export default Login;
