
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        // userType: ''
    });

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        // userType: ''
    });

    const handleSuccessfulRegister = (token) => {
        localStorage.setItem('token', token);
        navigate('/dashboard');
    };

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // Client-side validation
        if (!user.firstName || !user.lastName || !user.email || !user.password || !user.confirmPassword ) {
            setErrors({
                firstName: user.firstName ? '' : 'First Name is required',
                lastName: user.lastName ? '' : 'Last Name is required',
                email: user.email ? '' : 'Email is required',
                password: user.password ? '' : 'Password is required',
                confirmPassword: user.confirmPassword ? '' : 'Confirm Password is required',
                
            });
            return;
        }

        axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
            .then((res) => {
                console.log(res);
                handleSuccessfulRegister(res.data.token); // Appel de la fonction handleSuccessfulRegister avec le jeton JWT reçu
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="container">
             <form className='col-md-6 mx-auto mt-3 border border-4 rounded-5 text-light p-4 shadow-lg gap-3' style={{ background: 'linear-gradient(#7C3AED, #2F156D)' }} onSubmit={submitHandler}>
                <div className='form-group'>
                    <label>First Name: </label>
                    <input type="text" className='form-control' onChange={changeHandler} value={user.firstName} name='firstName' />
                    {errors.firstName && <p className='text-danger'>{errors.firstName}</p>}
                </div>

                <div className='form-group'>
                    <label>Last Name: </label>
                    <input type="text" className='form-control' onChange={changeHandler} value={user.lastName} name='lastName' />
                    {errors.lastName && <p className='text-danger'>{errors.lastName}</p>}
                </div>

                <div className='form-group'>
                    <label>Email: </label>
                    <input type="text" className='form-control' onChange={changeHandler} value={user.email} name='email' />
                    {errors.email && <p className='text-danger'>{errors.email}</p>}
                </div>

                <div className='form-group'>
                    <label>Password: </label>
                    <input type="password" className='form-control' onChange={changeHandler} value={user.password} name='password' />
                    {errors.password && <p className='text-danger'>{errors.password}</p>}
                </div>

                <div className='form-group'>
                    <label>Confirm Password: </label>
                    <input type="password" className='form-control' onChange={changeHandler} value={user.confirmPassword} name='confirmPassword' />
                    {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword}</p>}
                </div>
                <button className='col-12 btn btn-outline-primary mt-2'>Register</button>
                <Link className='text-white d-block text-center' to={'/login'}>Already have an account?</Link>
            </form>
        </div>
    );
};

export default Register;



